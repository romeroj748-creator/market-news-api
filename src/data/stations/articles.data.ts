import { Article } from "./../../models/article/article.model";

export class ArticleParser {
  public parseArticles = async (
    articles: any,
    station: string
  ): Promise<Array<Article>> => {
    return new Promise<Array<Article>>(async (resolve, reject) => {
      switch (station) {
        case "CNBC":
          return this.parseCNBC(articles, station).then(articlesArr => {
            resolve(articlesArr);
          });
        case "Marketwatch":
          return this.parseMw(articles, station).then(articlesArr => {
            resolve(articlesArr);
          });
        case "Nasdaq":
          return this.parseNasdaq(articles, station).then(articlesArr => {
            resolve(articlesArr);
          });
        case "Wallstreet Journal":
          return this.parseWsj(articles, station).then(articlesArr => {
            resolve(articlesArr);
          });
        default:
          reject({ message: "Error reading station name " });
      }
    });
  };

  private parseCNBC = async (
    articles: any,
    station: string
  ): Promise<Array<Article>> => {
    return new Promise<Array<Article>>((resolve, reject) => {
      const articleArr = articles.items.map((a: any) => {
        return new Article({
          title: a.title,
          content: a.content,
          date: new Date(a.isoDate),
          link: a.link,
          source: station
        });
      });
      resolve(articleArr);
    });
  };

  private parseMw = async (
    articles: any,
    station: string
  ): Promise<Array<Article>> => {
    return new Promise<Array<Article>>((resolve, reject) => {
      const articleArr = articles.items.map((a: any) => {
        return new Article({
          title: a.title,
          content: a.content,
          date: new Date(a.isoDate),
          link: a.link,
          source: station
        });
      });
      resolve(articleArr);
    });
  };

  private parseNasdaq = async (
    articles: any,
    station: string
  ): Promise<Array<Article>> => {
    return new Promise<Array<Article>>((resolve, reject) => {
      const articleArr = articles.items.map((a: any) => {
        return new Article({
          title: a.title,
          content: a.content,
          date: new Date(a.isoDate),
          link: a.link,
          source: station
        });
      });
      resolve(articleArr);
    });
  };

  private parseWsj = async (
    articles: any,
    station: string
  ): Promise<Array<Article>> => {
    return new Promise<Array<Article>>((resolve, reject) => {
      const articleArr = articles.items.map((a: any) => {
        return new Article({
          title: a.title,
          content: a.content,
          date: new Date(a.isoDate),
          link: a.link,
          source: station
        });
      });
      resolve(articleArr);
    });
  };
}
