import { YoutubeVideo } from "./youtube-video.model";

export class YoutubeChannel {
  public id: string;
  public title: string;
  public videos: Array<YoutubeVideo>;

  constructor(data?: any) {
    const defaults = {
      id: "",
      title: "",
      videos: []
    };

    this.id = defaults.id;
    this.title = defaults.title;
    this.videos = defaults.videos.map((v: YoutubeVideo) => v);
  }
}
