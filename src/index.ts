import { MarketNewsAPI } from "./api/marketnews.api";

const api: MarketNewsAPI = new MarketNewsAPI();

// api.autoScan();

api.createFeeds().then(feeds => {
  console.log(feeds);
});
