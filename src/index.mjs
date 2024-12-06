import express from "express";
import { body, query, validationResult } from "express-validator";

const app = express();

app.use(express.json());

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

app.use(loggingMiddleware);

const resolvedIndexByUser = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) {
    return res.sendStatus(400);
  }
  const findUserId = mockData.findIndex((user) => user.id === parseId);
  if (findUserId === -1) return res.sendStatus(404);
  req.findUserId = findUserId;
  next();
};

const PORT = process.env.PORT || 3000;

const mockData = [
  { id: 1, name: "John Doe", username: "johndoe", displayname: "John" },
  { id: 2, name: "long ketin", username: "longketin", displayname: "long" },
  { id: 3, name: "ruth Smith", username: "ruthsmith", displayname: "ruth" },
];

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello World!" });
});

app.get(
  "/api/user",
  query("filter").isString().notEmpty().withMessage("it must be empty"),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);

    const {
      query: { filter, value },
    } = req;
    if (filter && value) {
      return res.send(mockData.filter((user) => user[filter].includes(value)));
    }
    return res.send(mockData);
  }
);

app.post(
  "/api/user",
  body().isString().withMessage("it must be a string"),
  (req, res) => {
    const { body } = req;
    const newUser = { id: mockData[mockData.length - 1].id + 1, ...body };
    mockData.push(newUser);
    return res.status(201).send(newUser);
  }
);

app.get("/api/user/:id", resolvedIndexByUser, (req, res) => {
  const { findUserId } = req;
  const findUser = mockData[findUserId];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.put("/api/user/:id", resolvedIndexByUser, (req, res) => {
  const { body, findUserId } = req;
  mockData[findUserId] = { id: mockData[findUserId].id, ...body };
  return res.sendStatus(200);
});

app.patch("/api/user/:id", resolvedIndexByUser, (req, res) => {
  const { body, findUserId } = req;

  mockData[findUserId] = { ...mockData[findUserId], ...body };
  return res.sendStatus(200);
});

app.delete("/api/user/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);
  const findUserId = mockData.findIndex((user) => user.id === parseId);
  if (findUserId === -1) return res.sendStatus(404);
  mockData.splice(findUserId, 1);
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
