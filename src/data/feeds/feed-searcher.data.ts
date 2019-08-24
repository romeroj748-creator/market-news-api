import { Article } from "./../../models/article/article.model";
import { FeedQueryOptions } from "./../../models/feed/feed-query-options.model";
import { Feed } from "./../../models/feed/feed.model";
import { FileReader } from "./../../tools/filereader";

export class FeedSearcher {
  private filereader: FileReader;
  constructor() {
    this.filereader = new FileReader();
  }

  public getFeed = async (name: string): Promise<Array<Article>> => {
    return new Promise<Array<Article>>((resolve, reject) => {
      const path = "./src/data/feeds/feeds.txt";
      this.filereader.readObjectFromFile(path).then((fs: Array<Feed>) => {
        const feed = fs.find(f => f.name === name);
        let articles: Array<Article> = [];
        if (feed !== undefined) {
          articles = feed.articles.map((a: Article) => {
            return new Article(a);
          });
          resolve(articles);
        } else {
          reject({ message: "Unable to find feed with that name." });
        }
      });
    });
  };

  public getFeedCustom = async (
    name: string,
    options: FeedQueryOptions
  ): Promise<Feed> => {
    return new Promise<Feed>((resolve, reject) => {
      const path = "./src/data/feeds/feeds.txt";
      this.filereader.readObjectFromFile(path).then((fs: Array<Feed>) => {
        const feed = new Feed();
        feed.name = name;
        fs.forEach((f: Feed) => {});
      });
    });
  };
}
