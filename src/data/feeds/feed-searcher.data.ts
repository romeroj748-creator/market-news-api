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

  // BRb getting more food
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

            // filter based on station
            if (options.stations.length > 0) {
              if (!options.stations.includes(a.station)) {
                valid = false;
              }
            }

            // filter based on channel
            if (options.channels.length > 0) {
              if (!options.channels.includes(a.channel)) {
                valid = false;
              }
            }

            // filter based on dateStart ?? fix
            if (options.dateStart < a.date) {
              valid = false;
            }

            // filter based on dateEnd ?? fix
            if (options.dateEnd > a.date) {
              valid = false;
            }

            // filter based on title
            if (options.titleContains !== "") {
              if (!a.title.includes(options.titleContains)) {
                valid = false;
              }
            }

            // filter based on content
            if (options.contentContains !== "") {
              if (!a.content.includes(options.contentContains)) {
                valid = false;
              }
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
