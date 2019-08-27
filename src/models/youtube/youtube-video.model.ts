export class YoutubeVideo {
  public id: string;
  public channelId: string;
  public thumbnailUrl: string;
  public title: string;
  public description: string;
  public datePosted: Date;

  constructor(data?: any) {
    const defaults = {
      id: "",
      channelId: "",
      thumbnailUrl: "",
      title: "",
      description: "",
      datePosted: "",
      ...data
    };

    this.id = defaults.id;
    this.channelId = defaults.channelId;
    this.thumbnailUrl = defaults.thumbnailUrl;
    this.title = defaults.title;
    this.description = defaults.description;
    this.datePosted = defaults.datePosted;
  }
}
