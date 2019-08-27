export class YoutubeVideo {
  public id: string;
  public channelId: string;
  public channelTitle: string;
  public thumbnailUrl: string;
  public title: string;
  public description: string;
  public datePosted: Date;

  constructor(data?: any) {
    const defaults = {
      id: "",
      channelId: "",
      channelTitle: "",
      thumbnailUrl: "",
      title: "",
      description: "",
      datePosted: "",
      ...data
    };

    this.id = defaults.id;
    this.channelId = defaults.channelId;
    this.channelTitle = defaults.channelTitle;
    this.thumbnailUrl = defaults.thumbnailUrl;
    this.title = defaults.title;
    this.description = defaults.description;
    this.datePosted = defaults.datePosted;
  }
}
