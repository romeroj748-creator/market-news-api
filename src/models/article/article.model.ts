export class Article {
  public title: string;
  public description: string;
  public source: string;
  public date: Date;

  constructor(data?: any) {
    const defaults = {
      title: "",
      description: "",
      source: "",
      date: "",
      ...data
    };

    this.title = defaults.title;
    this.description = defaults.description;
    this.source = defaults.source;
    this.date = defaults.date;
  }
}
