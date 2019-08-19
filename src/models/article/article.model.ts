export class Article {
  public title: string;
  public station: string;
  public content: string;
  public channel: string;
  public date: Date;
  public link: string;

  constructor(data?: any) {
    const defaults = {
      title: "",
      content: "",
      station: "",
      channel: "",
      date: "",
      link: "",
      ...data
    };

    this.title = defaults.title;
    this.content = defaults.content;
    this.station = defaults.station;
    this.channel = defaults.channel;
    this.date = defaults.date;
    this.link = defaults.link;
  }
}
