import { Article } from "src/models/article/article.model";
import { Channel } from "src/models/channel/channel.model";
import { Station } from "src/models/station/station.model";

export class StationParser {
  constructor() {}

  public extractArticlesMap = async (
    stations: Array<Station>
  ): Promise<Map<string, Article>> => {
    return new Promise<Map<string, Article>>((resolve, reject) => {
      const articlesMap: Map<string, Article> = new Map();
      // n ^ 2 algorithm
      stations.forEach(s => {
        s.channels.map((c: Channel) => {
          if (c !== undefined && c.articles !== undefined) {
            c.articles.map((a: Article) => {
              const customHash = a.title;
              articlesMap.set(customHash, a);
            });
          }
        });
      });
      resolve(articlesMap);
    });
  };
}
