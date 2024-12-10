import express from "express";
import { mockData } from "./utils/constant.mjs";
import { resolvedIndexByUser } from "./utils/middlewares.mjs";
import router from "./routers/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express();

app.use(express.json());
app.use(cookieParser("hello world"));
app.use(
  session({
    secret: "elijah techking",
    saveUninitialized: false,
    resave: false,
    cookie:{
      maxAge: 6000 * 60,
    }
  })
);
app.use(router);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello World!" });
});

app.get("/api/user/:id", resolvedIndexByUser, (req, res) => {
  const { findUserId } = req;
  const findUser = mockData[findUserId];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
  
  res.cookie("jesus is lord", { maxAge: 6000 * 60 * 2 });
  res.status(201).send({ msg: "Hello World!", signed: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
