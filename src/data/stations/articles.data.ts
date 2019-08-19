import { Article } from "./../../models/article/article.model";
import { Channel } from "./../../models/channel/channel.model";

export class ArticleParser {
  public parseArticles = async (
    articles: any,
    channel: Channel
  ): Promise<Array<Article>> => {
    return new Promise<Array<Article>>(async (resolve, reject) => {
      switch (channel.station) {
        case "CNBC":
          return this.parseCNBC(articles, channel).then(articlesArr => {
            resolve(articlesArr);
          });
        case "Marketwatch":
          return this.parseMw(articles, channel).then(articlesArr => {
            resolve(articlesArr);
          });
        case "Nasdaq":
          return this.parseNasdaq(articles, channel).then(articlesArr => {
            resolve(articlesArr);
          });
        case "Wallstreet Journal":
          return this.parseWsj(articles, channel).then(articlesArr => {
            resolve(articlesArr);
          });
        default:
          reject({ message: "Error reading station name " });
      }
    });
  };

  private parseCNBC = async (
    articles: any,
    channel: Channel
  ): Promise<Array<Article>> => {
    return new Promise<Array<Article>>((resolve, reject) => {
      const articleArr = articles.items.map((a: any) => {
        return new Article({
          title: a.title,
          content: a.content,
          station: channel.station,
          channel: channel.name,
          date: new Date(a.isoDate),
          link: a.link
        });
      });
      resolve(articleArr);
    });
  };

  private parseMw = async (
    articles: any,
    channel: Channel
  ): Promise<Array<Article>> => {
    return new Promise<Array<Article>>((resolve, reject) => {
      const articleArr = articles.items.map((a: any) => {
        return new Article({
          title: a.title,
          content: a.content,
          station: channel.station,
          channel: channel.name,
          date: new Date(a.isoDate),
          link: a.link
        });
      });
      resolve(articleArr);
    });
  };

  private parseNasdaq = async (
    articles: any,
    channel: Channel
  ): Promise<Array<Article>> => {
    return new Promise<Array<Article>>((resolve, reject) => {
      const articleArr = articles.items.map((a: any) => {
        return new Article({
          title: a.title,
          content: a.content,
          station: channel.station,
          channel: channel.name,
          date: new Date(a.isoDate),
          link: a.link
        });
      });
      resolve(articleArr);
    });
  };

  private parseWsj = async (
    articles: any,
    channel: Channel
  ): Promise<Array<Article>> => {
    return new Promise<Array<Article>>((resolve, reject) => {
      const articleArr = articles.items.map((a: any) => {
        return new Article({
          title: a.title,
          content: a.content,
          station: channel.station,
          channel: channel.name,
          date: new Date(a.isoDate),
          link: a.link
        });
      });
      resolve(articleArr);
    });
  };
}
