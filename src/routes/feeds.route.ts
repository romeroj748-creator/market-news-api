import express, { Request, Response } from "express";
const router = express.Router();
import { FeedSearcher } from "./../data/feeds/feed-searcher.data";

router.get("/test", (req: Request, res: Response) => {
  res.send({ message: "Feeds Route is Working!" });
});

router.post("/", (req: Request, res: Response) => {
  const feedName = req.body.feedName;
  new FeedSearcher()
    .getFeed(feedName)
    .then(feed => {
      res.status(200).send({ feed });
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

module.exports = router;
