// import { Channel } from "../channel/channel.model";
import { Article } from "../article/article.model";

export class Feed {
  public name: string;
  public articles: Array<Article>;

  constructor(data?: any) {
    const defaults = {
      name: "",
      articles: [],
      ...data
    };

    this.name = defaults.name;
    this.articles = defaults.articles;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}
