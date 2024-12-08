import express from "express";
import { mockData } from "./utils/constant.mjs";
import { resolvedIndexByUser } from "./utils/middlewares.mjs";
import router from "./routers/index.mjs";
const app = express();

app.use(express.json());
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
