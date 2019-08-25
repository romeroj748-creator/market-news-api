import express, { Request, Response } from "express";
const router = express.Router();
import { FeedSearcher } from "./../data/feeds/feed-searcher.data";
import { FeedQueryOptions } from "./../models/feed/feed-query-options.model";

const feedSearcher = new FeedSearcher();

router.get("/list", (req: Request, res: Response) => {
  new FeedSearcher()
    .listFeeds()
    .then(feeds => {
      res.status(200).send(feeds);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.post("/read", (req: Request, res: Response) => {
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
  feedSearcher
    .getFeed(options)
    .then(feed => {
      console.log(feed);
      res.status(200).send(feed);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

module.exports = router;
