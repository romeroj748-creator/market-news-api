import { MarketNews } from "./api/marketnews.api";
import { FileReader } from "./tools/filereader";
import { Station } from "./models/station/station.model";
import { Channel } from "./models/channel/channel.model";
import { Article } from "./models/article/article.model";

// const marketNews = new MarketNews();

// marketNews.listStations();

const fr = new FileReader();

let stationsText: any = null;

const extractChannels = async (
  stations: Array<Station>
): Promise<Map<string, Article>> => {
  return new Promise<Map<string, Article>>((resolve, reject) => {
    // console.log(stations);

    const channelsArr: Array<Channel> = [];

    const articlesMap: Map<string, any> = new Map();

    // n ^ 2 algorithm
    stations.forEach(s => {
      s.channels.map((c: Channel) => {
        // channelsArr.push(c);
        c.articles.map((a: Article) => {
          const customHash = a.title + a.date.toString();
          articlesMap.set(customHash, a);
        });
      });
    });

    resolve(articlesMap);
  });
};

fr.readObjectFromFile("./src/data/stations/stations.txt").then(data => {
  stationsText = data;
  extractChannels(stationsText).then(articlesMap => {
    console.log(articlesMap);

    // console.log(`The length of this object is: ${channels.length}`);
  });
});
