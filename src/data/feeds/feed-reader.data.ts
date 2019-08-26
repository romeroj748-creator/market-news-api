import { Article } from "./../../models/article/article.model";
import { Feed } from "./../../models/feed/feed.model";
import { Station } from "./../../models/station/station.model";
import { FileReader } from "./../../tools/filereader";
import { FileWriter } from "./../../tools/filewriter";
import * as FeedsJson from "./json/feeds.json";

export class FeedReader {
  private fileReader: FileReader;
  private fileWriter: FileWriter;

  constructor() {
    this.fileReader = new FileReader();
    this.fileWriter = new FileWriter();
  }

  public createFeeds = (): void => {
    const path = "./src/data/stations/stations.txt";
    this.fileReader
      .readObjectFromFile(path)
      .then((stations: Array<Station>) => {
        // Iterate Through each feed in FeedsJson
        const feeds: Array<Feed> = [];
        FeedsJson.feeds.forEach(f => {
          const feed = new Feed({
            name: f.name
          });

          // Add all articles in this feed
          f.channels.forEach(c => {
            const station = stations.find(s => s.name === c.stationName);
            if (station !== undefined) {
              const channel = station.channels.find(
                ch => ch.name === c.channelName
              );
              if (channel !== undefined) {
                channel.articles.forEach(a => {
                  feed.articles.push(a);
                });
              }
            }
          });
          feeds.push(feed);
        });
        this.fileWriter.writeObjectToFile(feeds, "./src/data/feeds/feeds.txt");
      });
  };
}
