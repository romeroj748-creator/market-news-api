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

  public getFeedCustom = async (options: FeedQueryOptions): Promise<Feed> => {
    return new Promise<Feed>((resolve, reject) => {
      const path = "./src/data/feeds/feeds.txt";
      this.filereader.readObjectFromFile(path).then((fs: Array<Feed>) => {
        const f = fs.find((fe: Feed) => fe.name === options.name);
        const feed = new Feed();
        feed.name = options.name;
        console.log(options);
        if (f !== undefined) {
          f.articles.forEach(a => {
            let valid = true;
            if (options.stations.length > 0) {
              if (!options.stations.includes(a.station)) {
                valid = false;
              }
            }
            if (options.channels.length > 0) {
              if (!options.channels.includes(a.channel)) {
                valid = false;
              }
            }
            if (options.dateStart > new Date(a.date)) {
              valid = false;
            }
            if (options.dateEnd < new Date(a.date)) {
              valid = false;
            }
            if (options.titleContains.length > 0) {
              let v = false;
              options.titleContains.forEach(str => {
                if (a.title.toLocaleLowerCase().includes(str.toLowerCase())) {
                  v = true;
                }
              });
              valid = v;
            }
            if (options.contentContains.length > 0) {
              let v = false;
              options.contentContains.forEach(str => {
                if (a.content.toLocaleLowerCase().includes(str.toLowerCase())) {
                  v = true;
                }
              });
              valid = v;
            }
            if (valid && feed.articles.length < options.resultLimit) {
              feed.articles.push(a);
            }
          });
        }
        resolve(feed);
      });
    });
  };
}
