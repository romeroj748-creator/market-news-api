import * as fs from "fs";
import { Feed } from "./../models/feed/feed.model";

export class FileReader {
  public readObjectFromFile = async (path: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      fs.readFile(path, (error, contents) => {
        if (error !== null) {
          console.error(
            "An error occurred while reading JSON Object from file"
          );
          console.error(error);

          return;
        }

        const data = JSON.parse(contents.toString());

        resolve(data);
      });
    });
  };

  public readFeedsFromFile = async (): Promise<Array<Feed>> => {
    const path = "./src/data/feeds/feeds.txt";

    return this.readObjectFromFile(path).then((feeds: Array<Feed>) => {
      return feeds;
    });
  };
}
