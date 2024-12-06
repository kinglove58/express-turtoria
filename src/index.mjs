import express from "express";

const app = express();

app.use(express.json());

const mockData = [
  { id: 1, name: "John Doe", username: "johndoe", displayname: "John" },
  { id: 2, name: "long ketin", username: "longketin", displayname: "long" },
  { id: 3, name: "ruth Smith", username: "ruthsmith", displayname: "ruth" },
];
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello World!" });
});

app.get("/api/user", (req, res) => {
  //console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  // if (!filter && !value) return res.send(mockData);
  if (filter && value) {
    return res.send(mockData.filter((user) => user[filter].includes(value)));
  }

  return res.send(mockData);

  // res.send(mockData);
});

app.post("/api/user", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = { id: mockData[mockData.length - 1].id + 1, ...body };
  mockData.push(newUser);

  return res.status(201).send(newUser);
});

app.get("/api/user/:id", (req, res) => {
  console.log(req.params);
  const parseId = parseInt(req.params.id);
  if (isNaN(parseId)) {
    return res.status(400).send({
      msg: "Invalid id",
    });
  }

  app.put("/api/user/:id", (req, res) => {
    const {
      body,
      params: { id },
    } = req;

    const parseId = parseInt(id);
    if (isNaN(parseId)) {
      return res.sendStatus(400);
    }
    const findUserId = mockData.indIndexf((user) => user.id === parseId);
    if (findUserId === -1) return res.sendStatus(404);
    mockData[findUserId] = { id: parseId, ...body };
    return res.sendStatus(200);
  });

  const findUser = mockData.find((user) => user.id === parseId);
  if (!findUser) res.sendStatus(404);
  return res.send(findUser);
});

app.patch("/api/user/:id", (req, res) => {
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
  mockData[findUserId] = { ...mockData[findUserId], ...body };
  return res.sendStatus(200);
});

app.delete("/api/user/:id", (res, req) => {
  const {
    params: { id },
  } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);
  const findUserId = mockData.findIndex((user) => user.id === parseId);
  if (findUserId === -1) return res.sendStatus(404);
  mockData.splice(findUserId);
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
