import { Router } from "express";
import { query, validationResult } from "express-validator";
import { mockData } from "../utils/constant.mjs";
import { resolvedIndexByUser } from "../utils/middlewares.mjs";
import { User } from "../mongoose/schemas/data.mjs";
import mongoose from "mongoose";

const router = Router();

router.get(
  "/api/user",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Filter must be a non-empty string"),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const {
      query: { filter, value },
    } = req;
    if (filter && value) {
      return res.send(mockData.filter((user) => user[filter].includes(value)));
    }
    return res.send(mockData);
  }
);

router.post("/api/user", async (req, res) => {
  const { body } = req;
  const newUser = new User(body);

  try {
    const savedUser = await newUser.save();
    return res.status(200).send(savedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
});

router.put("/api/user/:id", resolvedIndexByUser, (req, res) => {
  const { body, findUserId } = req;
  mockData[findUserId] = { id: mockData[findUserId].id, ...body };
  return res.sendStatus(200);
});

router.patch("/api/user/:id", resolvedIndexByUser, (req, res) => {
  const { body, findUserId } = req;
  mockData[findUserId] = { ...mockData[findUserId], ...body };
  return res.sendStatus(200);
});

router.delete("/api/user/:id", (req, res) => {
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

export default router;
