import { Router } from "express";
import {
  query,
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";
import { mockData } from "../utils/constant.mjs";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { resolvedIndexByUser } from "../utils/middlewares.mjs";

const router = Router();

router.get(
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

router.post(
  "/api/user",
  checkSchema(createUserValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send(result.array());
    }
    const data = matchedData(req);
    console.log("Received data:", data); // Log the received data for debugging

    const newUser = { id: mockData[mockData.length - 1].id + 1, ...data };
    mockData.push(newUser);
    return res.status(201).send(newUser);
  }
);

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
