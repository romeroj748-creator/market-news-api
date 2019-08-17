import * as Parser from "rss-parser";
import { Channel } from "./../../models/channel/channel.model";
import { Station } from "./../../models/station/station.model";
import cnbc = require("./json/cnbc.json");
import marketwatch = require("./json/marketwatch.json");
import wallstreetjournal = require("./json/wallstreetjournal.json");
import { Article } from "src/models/article/article.model";

export class Stations {
  private stations: Array<Station>;

  constructor() {
    this.stations = [];
  }

  public getStations(): Array<Station> {
    this.populateData();
    return this.stations;
  }

  public reloadStations(): void {
    this.populateData();
  }

  private populateData = (): void => {
    this.loadStations().then(stations => {
      const loadChannelsArr = stations.map(s => {
        return this.loadChannels(s.channels).then(channels => {
          return channels;
        });
      });

      // console.log(JSON.stringify(stations, null, 3));
    });
  };

  // Loads all the stations stored in Json files // Working
  private loadStations = async (): Promise<Array<Station>> => {
    return new Promise<Array<Station>>((resolve, reject) => {
      const data = [cnbc, marketwatch, wallstreetjournal];
      const stations = data.map(s => {
        return new Station({
          name: s.name,
          channels: s.channels
        });
      });
      resolve(stations);
    });
  };

  // Take in an array of channels and returnt the same array except with Articles Array
  private loadChannels = async (c: Array<Channel>): Promise<Array<Channel>> => {
    return new Promise<Array<Channel>>((resolve, reject) => {
      const ch = c.map((cha: Channel) => {
        return this.loadArticles(cha).then(articles => {
          console.log("Loading " + cha.name);
          return new Channel({
            name: cha.name,
            url: cha.url,
            articles
          });
        });
      });

      Promise.all(ch).then(channels => {
        resolve(channels);
      });
    });
  };

  private loadArticles = async (channel: Channel): Promise<any> => {
    return new Promise((resolve, reject) => {
      const parser = new Parser();
      parser.parseURL(channel.url).then(articles => {
        resolve(articles);
      });
    });
  };
}
