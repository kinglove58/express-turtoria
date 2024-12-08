import { Router } from "express";
import usersRouter from "./products.mjs";
import productRouter from "./users.mjs";
const router = Router();

router.use(usersRouter);
router.use(productRouter);
export default router;
