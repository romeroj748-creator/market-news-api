import { MarketNewsAPI } from "./api/marketnews.api";

const api: MarketNewsAPI = new MarketNewsAPI();

// api.autoScan();

api.searchFeed("Markets").then(feed => {
  console.log(JSON.stringify(feed, null, 3));
});
