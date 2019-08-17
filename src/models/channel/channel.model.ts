import { Article } from "../article/article.model";

export class Channel {
  public name: string;
  public articles: Array<Article>;

  constructor(data?: any) {
    const defaults = {
      name: "",
      articles: [],
      ...data
    };

    this.name = defaults.name;
    this.articles = defaults.articles.map((a: Article) => a);
  }
}
