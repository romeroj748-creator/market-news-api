import { Article } from "../article/article.model";

export class Channel {
  public name: string;
  public station: string;
  public url: string;
  public articles: Array<any>;

  constructor(data?: any) {
    const defaults = {
      name: "",
      station: "",
      url: "",
      articles: [],
      ...data
    };

    this.name = defaults.name;
    this.station = defaults.station;
    this.url = defaults.url;
    this.articles = defaults.articles;
  }
}
