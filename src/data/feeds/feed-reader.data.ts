import { Station } from "src/models/station/station.model";
import { Feed } from "./../../models/feed/feed.model";
import { FileReader } from "./../../tools/filereader";
import * as FeedsJson from "./json/feeds.json";

export class FeedReader {
  private fileReader: FileReader;

  constructor() {
    this.fileReader = new FileReader();
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
        console.log("Done interating");
        console.log(JSON.stringify(feeds, null, 3));
      });
  };
}
