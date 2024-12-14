import express from "express";
import { mockData } from "./utils/constant.mjs";
import { resolvedIndexByUser } from "./utils/middlewares.mjs";
import router from "./routers/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import "./strategies/local-strategy.mjs";

mongoose
  .connect("mongodb://localhost/expressjs_turtoria")
  .then(() => console.log("connected to data base"))
  .catch((err) => console.log(`Error: ${err}`));

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
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

const PORT = process.env.PORT || 3000;

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200);
});

app.get("/api/auth/status", (req, res) => {
  console.log(`inside /auth/status endpoint`);
  console.log("req.user");
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

app.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(401);
    res.sendStatus(200); // Corrected from res.send(200) to res.sendStatus(200)
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
