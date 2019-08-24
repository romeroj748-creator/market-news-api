import express, { Request, Response } from "express";
const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send({ message: "Feeds Route is Working!" });
});

module.exports = router;
