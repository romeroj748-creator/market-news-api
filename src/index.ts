import * as Parser from "rss-parser";
import { MarketNews } from "./api/marketnews.api";

const parser = new Parser();

const marketNews = new MarketNews();

marketNews.testStations();

// const channels = {
//   cnbc: [],
//   mw: [],
//   wsj: []
// };

// const testFeeds = () => {
//   channels.wsj.forEach(f => {
//     (async () => {
//       const feed = await parser.parseURL(f.url);
//       console.log(f.title);
//       console.log(feed.title);
//     })();
//   });
// };

// const getChannel = (name: string) => {
//   switch (name) {
//     case "cnbc":
//       return channels.cnbc;
//     case "marketwatch":
//       return channels.mw;
//     case "wallstreetjournal":
//       return channels.wsj;
//     default:
//       return null;
//   }
// };

// const getFeed = (title: string, channel: string) => {
//   return async () => {
//     const c = getChannel(channel);
//     if (c === null) {
//       throw { error: "Channel not found" };
//     }
//     const feed = c.find(f => f.title.toLowerCase() === title.toLowerCase());
//     if (feed === undefined) {
//       throw { error: "Feed not found" };
//     }
//     const feedData = await parser.parseURL(feed.url);
//     if (feedData.code === "ECONNREFUSED") {
//       throw { error: "Invalid URL" };
//     }

//     return feedData;
//   };
// };

// const getBusinessFeed = async () => {
//   return getFeed("business", "cnbc")();
// };

// const getMarketPulseFeed = async () => {
//   return getFeed("Mad Money", "cnbc")();
// };

// getMarketPulseFeed()
//   .then(feed => {
//     console.log(feed);
//   })
//   .catch(error => {
//     console.error(error);
//   });
