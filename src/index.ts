import bodyParser = require("body-parser");
import express = require("express");
import { MarketNewsAPI } from "./api/marketnews.api";
const feeds = require("./routes/feeds.route");

// Initialize Server
const server: express.Application = express();
const port: number = 3000;

// Configure Middleware
server.use(bodyParser.json({ limit: "1mb" }));

// Configure Server Routes
server.use("/feeds", feeds);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const api: MarketNewsAPI = new MarketNewsAPI();

api.autoScan();

// api.searchFeed("Markets").then(feed => {
//   console.log(JSON.stringify(feed, null, 3));
// });
