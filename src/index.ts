import bodyParser = require("body-parser");
import express, { NextFunction, Request, Response } from "express";
import { MarketNewsAPI } from "./api/marketnews.api";
import { YoutubeParser } from "./data/youtube/youtube-parser.data";
import { YoutubeScanner } from "./data/youtube/youtube-scanner.data";
const feeds = require("./routes/feeds.route");

// Initialize Server
const server: express.Application = express();
const port: number = 3001;

// Configure Middleware
server.use(bodyParser.json({ limit: "1mb" }));

// Configure Headers
server.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Configure Server Routes
server.use("/feeds", feeds);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// const api: MarketNewsAPI = new MarketNewsAPI();

// api.autoScan();

const ytApi: YoutubeScanner = new YoutubeScanner();
const ytParser: YoutubeParser = new YoutubeParser();

ytApi
  .scanChannels()
  .then(channels => {
    // console.log(channels);
    ytParser
      .mergeVideos(channels, 20)
      .then(videos => {
        console.log(videos);
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.error(error);
  });
