let Parser = require("rss-parser");
let parser = new Parser();
let cnbc = require("./feeds/cnbc.json");
let mw = require("./feeds/marketwatch.json");
let wsj = require("./feeds/wallstreetjournal.json");

let channels = {
  cnbc,
  mw,
  wsj
};

const testFeeds = () => {
  feeds.wsj.forEach(f => {
    (async () => {
      let feed = await parser.parseURL(f.url);
      console.log(f.title);
      console.log(feed.title);
    })();
  });
};

const getChannel = name => {
  switch (name) {
    case "cnbc":
      return channels.cnbc;
    case "marketwatch":
      return channels.mw;
    case "wallstreetjournal":
      return channels.wsj;
    default:
      return null;
  }
};

const getFeed = (title, channel) => {
  return async () => {
    var c = getChannel(channel);
    if (channel == null) {
      throw { error: "Channel not found" };
    }
    var feed = c.find(f => f.title.toLowerCase() == title.toLowerCase());
    if (feed == null) {
      throw { error: "Feed not found" };
    }
    let f = await parser.parseURL(feed.url);
    if (f.code == "ECONNREFUSED") {
      throw { error: "Invalid URL" };
    }
    return f;
  };
};

getBusinessFeed = () => {
  return getFeed("business", "cnbc")();
};

getMarketPulseFeed = () => {
  return getFeed("Asia News", "cnbc")();
};

getMarketPulseFeed()
  .then(feed => {
    console.log(feed);
  })
  .catch(error => {
    console.error(error);
  });
