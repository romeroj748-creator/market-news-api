import { FeedQueryOptions } from "src/models/feed/feed-query-options.model";
import { Feed } from "src/models/feed/feed.model";
import { FileReader } from "./../../tools/filereader";

export class FeedSearcher {
  private filereader: FileReader;
  constructor() {
    this.filereader = new FileReader();
  }

  public getFeed = async (name: string): Promise<Feed> => {
    return new Promise<Feed>((resolve, reject) => {
      const path = "./src/data/feeds/feeds.txt";
      this.filereader.readObjectFromFile(path).then((fs: Array<Feed>) => {
        const feed = fs.find(f => f.name === name);
        if (feed !== undefined) {
          resolve(feed);
        } else {
          reject({ message: "Unable to find feed with that name." });
        }
      });
    });
  };

  public getFeedCustom = async (
    name: string,
    options: FeedQueryOptions
  ): Promise<Feed> => {
    return new Promise<Feed>((resolve, reject) => {
      throw "Not Implemented Exception";
    });
  };
}
