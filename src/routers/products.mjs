import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  console.log(req.signedCookies)

  if (req.cookies.hello && req.cookies.hello === "world")
    return res.send([
      {
        id: 123,
        name: "chicken",
        price: 3000,
      },
    ]);

  return res.send({ msg: "am sorry no cookies" });
});
export default router;
