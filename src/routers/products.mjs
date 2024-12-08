import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  res.send([
    {
      id: 123,
      name: "chicken",
      price: 3000,
    },
  ]);
});
export default router;
