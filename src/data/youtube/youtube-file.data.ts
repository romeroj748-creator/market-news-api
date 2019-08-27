import * as fs from "fs";
import { YoutubeVideo } from "./../../models/youtube/youtube-video.model";

export class YoutubeFile {
  private filePath = "./src/data/youtube/youtube.txt";

  public writeYoutubeVideosToFile(videos: Array<YoutubeVideo>): void {
    const videosJson = JSON.stringify(videos);
    fs.writeFile(this.filePath, videosJson, (error: Error | any) => {
      if (error) {
        console.error(error);
      }
    });
  }

  public readYoutubeVideosFromFile = async (): Promise<Array<YoutubeVideo>> => {
    return new Promise<Array<YoutubeVideo>>((resolve, reject) => {
      fs.readFile(this.filePath, async (error: Error | any, data: Buffer) => {
        if (error !== null) {
          console.log("Error occuring");
          reject(error);
        }
        const videos: Array<YoutubeVideo> = JSON.parse(data.toString());
        console.log(videos);
        resolve(videos);
      });
    });
  };
}
