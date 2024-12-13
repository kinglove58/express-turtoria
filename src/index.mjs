import express from "express";
import { mockData } from "./utils/constant.mjs";
import { resolvedIndexByUser } from "./utils/middlewares.mjs";
import router from "./routers/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
const app = express();

app.use(express.json());
app.use(cookieParser("hello world"));
app.use(
  session({
    secret: "elijah techking",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 6000 * 60,
    },
  })
);
app.use(passport.initialized)
app.use(passport.session)
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
  req.session.visited = true;

  res.cookie("jesus is lord", { maxAge: 6000 * 60 * 2 });
  res.status(201).send({ msg: "Hello World!", signed: true });
});

app.post("/api/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const findUser = mockData.find((user) => user.username === username);
  if (!findUser || findUser.password !== password)
    return res.status(401).send({ msg: "God have mercy" });

  req.session.user = findUser; // Corrected from res.session to req.session
  return res.status(200).send(findUser);
});

app.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
    console.log(session);
  });
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "not unauthenticated" });
});

app.post("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { body: item } = req;
  const { cart } = req.session;
  if (cart) {
    cart.push(cart);
  } else {
    req.session.cart = [item];
  }
  return res.status(200).send(item);
});

app.get("/api/cart", (req,res) =>{
  if(!req.session.user) return res.sendStatus(401);
  return res.send(req.session.cart ?? []);
})