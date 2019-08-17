import { Article } from "../article/article.model";

export class Channel {
  public name: string;
  public url: string;
  public articles: Array<any>;

  constructor(data?: any) {
    const defaults = {
      name: "",
      url: "",
      articles: [],
      ...data
    };

    this.name = defaults.name;
    this.url = defaults.url;
    this.articles = defaults.articles.map((a: any) => a);
  }
}
