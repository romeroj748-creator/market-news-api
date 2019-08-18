export class Article {
  public title: string;
  public content: string;
  public source: string;
  public date: Date;
  public link: string;

  constructor(data?: any) {
    const defaults = {
      title: "",
      content: "",
      source: "",
      date: "",
      link: "",
      ...data
    };

    this.title = defaults.title;
    this.content = defaults.content;
    this.source = defaults.source;
    this.date = defaults.date;
    this.link = defaults.link;
  }
}
