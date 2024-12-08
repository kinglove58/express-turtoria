import { mockData } from "./constant.mjs";


export const resolvedIndexByUser = (req, res, next) => {
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