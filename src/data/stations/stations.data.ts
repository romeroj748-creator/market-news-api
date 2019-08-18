import * as Parser from "rss-parser";
import { Article } from "src/models/article/article.model";
import { Channel } from "./../../models/channel/channel.model";
import { Station } from "./../../models/station/station.model";
import { FileWriter } from "./../../tools/filewriter";
import cnbc = require("./json/cnbc.json");
import marketwatch = require("./json/marketwatch.json");
import nasdaq = require("./json/nasdaq.json");
import wallstreetjournal = require("./json/wallstreetjournal.json");

const fw = new FileWriter();

export class Stations {
  private stations: Array<Station>;

  constructor() {
    this.stations = [];
  }

  public getStations(): Array<Station> {
    this.populateData().then(stations => {
      this.stations = stations;
    });

    return this.stations;
  }

  public reloadStations(): void {
    this.populateData().then(stations => {
      this.stations = stations;
    });
  }

  private populateData = async (): Promise<Array<Station>> => {
    return new Promise<Array<Station>>((resolve, reject) => {
      this.loadStations().then(stations => {
        const loadChannelsArr = stations.map(async (s: Station) => {
          return this.loadChannels(s).then(channels => {
            return channels;
          });
        });
        Promise.all(loadChannelsArr).then(channels => {
          for (let i = 0; i < stations.length; i++) {
            stations[i].channels = channels[i];
          }
          fw.writeObjectToFile(stations, "./src/data/stations/stations.txt");
          resolve(stations);
        });
      });
    });
  };

  // Loads all the stations stored in Json files // Working
  private loadStations = async (): Promise<Array<Station>> => {
    return new Promise<Array<Station>>((resolve, reject) => {
      const data = [cnbc, marketwatch, wallstreetjournal, nasdaq];
      const stations = data.map(s => {
        return new Station({
          name: s.name,
          channels: s.channels
        });
      });
      resolve(stations);
    });
  };

  // Take in an array of channels and returns the same array except with Articles Array
  private loadChannels = async (s: Station): Promise<Array<Channel>> => {
    return new Promise<Array<Channel>>((resolve, reject) => {
      const ch = s.channels.map(async (cha: Channel) => {
        return this.loadArticles(cha).then(articles => {
          console.log(`Loading ${cha.name}`);

          return new Channel({
            name: cha.name,
            station: s.name,
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

  // Takes in a channel and returns an article
  private loadArticles = async (channel: Channel): Promise<any> => {
    return new Promise((resolve, reject) => {
      const parser = new Parser();
      parser.parseURL(channel.url).then(articles => {
        resolve(articles);
      });
    });
  };
}
