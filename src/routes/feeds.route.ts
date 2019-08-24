import express, { Request, Response } from "express";
const router = express.Router();
import { FeedSearcher } from "./../data/feeds/feed-searcher.data";
import { FeedQueryOptions } from "./../models/feed/feed-query-options.model";

router.get("/test", (req: Request, res: Response) => {
  res.send({ message: "Feeds Route is Working!" });
});

router.post("/", (req: Request, res: Response) => {
  // we need a better way of parsing the body info

  const options: FeedQueryOptions = new FeedQueryOptions({
    name: req.body.name,
    stations: req.body.stations,
    channels: req.body.channels,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    titleContains: req.body.titleContains,
    contentContains: req.body.contentContains,
    resultLimit: req.body.resultLimit
  });

  new FeedSearcher()
    .getFeedCustom(options)
    .then(feed => {
      res.status(200).send({ feed });
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

module.exports = router;
