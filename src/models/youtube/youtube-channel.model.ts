import { YoutubeVideo } from "./youtube-video.model";

export class YoutubeChannel {
  public id: string;
  public videos: Array<YoutubeVideo>;

  constructor(data?: any) {
    const defaults = {
      id: "",
      videos: []
    };

    this.id = defaults.id;
    this.videos = defaults.videos.map((v: YoutubeVideo) => v);
  }
}
