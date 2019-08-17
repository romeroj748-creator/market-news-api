let Parser = require("rss-parser");
let parser = new Parser();
let cnbcFeeds = require("./cnbc.json");
let mwFeeds = require("./marketwatch.json");
let wsjFeeds = require("./wallstreetjournal.json");

let feeds = {
  cnbc: cnbcFeeds,
  mw: mwFeeds,
  wsj: wsjFeeds
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

const getFeed = title => {
  return async () => {
    var feed = feeds.cnbc.find(
      f => f.title.toLowerCase() == title.toLowerCase()
    );
    let f = await parser.parseURL(feed.url);
    if (f.code == "ECONNREFUSED") {
      throw { error: "Invalid URL" };
    }
    return f;
  };
};

getBusinessFeed = () => {
  return getFeed("business")();
};

// getBusinessFeed()
//   .then(feed => {
//     console.log(feed);
//   })
//   .catch(error => {
//     console.log(error);
//   });

testFeeds();
