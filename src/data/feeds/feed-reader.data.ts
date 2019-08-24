import { Station } from "src/models/station/station.model";
import { Feed } from "./../../models/feed/feed.model";
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
        FeedsJson.forEach(f => {
          const feed = new Feed({
            name: f.name
          });
          // Preform a lookup on Stations based on search critera
          f.channels.forEach(c => {
            const station = stations.find(s => s.name === c.stationName);
            if (station !== undefined) {
              const channel = station.channels.find(
                ch => ch.name === c.channelName
              );
              if (channel !== undefined) {
                feed.addChannel(channel);
              }
            }
          });
          feeds.push(feed);
        });
        this.fileWriter.writeObjectToFile(feeds, "./src/data/feeds/feeds.txt");
      });
  };
}
