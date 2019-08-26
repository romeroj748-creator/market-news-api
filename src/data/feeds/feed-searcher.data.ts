import { Article } from "./../../models/article/article.model";
import { FeedQueryOptions } from "./../../models/feed/feed-query-options.model";
import { Feed } from "./../../models/feed/feed.model";
import { FileReader } from "./../../tools/filereader";

export class FeedSearcher {
  private filereader: FileReader;
  constructor() {
    this.filereader = new FileReader();
  }

  public listFeeds = async (): Promise<Array<Feed>> => {
    return this.filereader.readFeedsFromFile().then((feeds: Array<Feed>) => {
      const fs: Array<Feed> = feeds;
      fs.forEach(f => {
        f.articles = [];
      });

      return fs;
    });
  };

  public getFeed = async (options: FeedQueryOptions): Promise<Feed> => {
    return new Promise<Feed>((resolve, reject) => {
      this.filereader.readFeedsFromFile().then((feeds: Array<Feed>) => {
        const f = feeds.find(
          (fe: Feed) => fe.name.toLowerCase() === options.name.toLowerCase()
        );
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
            if (
              new Date(0).getTime() !== options.dateStart.getTime() &&
              options.dateStart > new Date(a.date)
            ) {
              valid = false;
            }
            if (
              new Date(0).getTime() !== options.dateEnd.getTime() &&
              options.dateEnd < new Date(a.date)
            ) {
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
        resolve(this.sortFeedByDate(feed));
      });
    });
  };

  private sortFeedByDate = (feed: Feed): Feed => {
    feed.articles.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }

      return 0;
    });

    return feed;
  };
}
