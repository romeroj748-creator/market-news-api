import Parser from "rss-parser";
import { Article } from "src/models/article/article.model";
import { Channel } from "./../../models/channel/channel.model";
import { Station } from "./../../models/station/station.model";
import { FileWriter } from "./../../tools/filewriter";
import { ArticleParser } from "./../articles/article-parser.data";
import businessInsider = require("./json/businessinsider.json");
import cnbc = require("./json/cnbc.json");
import marketwatch = require("./json/marketwatch.json");
import nasdaq = require("./json/nasdaq.json");
import wallstreetjournal = require("./json/wallstreetjournal.json");

export class StationScanner {
  private parser: Parser;
  private articleParser: ArticleParser;
  private fw: FileWriter;

  constructor() {
    this.fw = new FileWriter();
    this.parser = new Parser();
    this.articleParser = new ArticleParser();
  }

  // Reads Array of Stations on Disk and scans each channel url for Articles
  public scanStations = async (): Promise<Array<Station>> => {
    return this.populateData().then(stations => {
      return stations;
    });
  };

  // Writes Array of Stations to Disk
  public saveStations = async (stations: Array<Station>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.fw.writeObjectToFile(stations, "./src/data/stations/stations.txt");
      resolve();
    });
  };

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
          resolve(stations);
        });
      });
    });
  };

  // Loads all the stations stored in Json files // Working
  private loadStations = async (): Promise<Array<Station>> => {
    return new Promise<Array<Station>>((resolve, reject) => {
      const data = [
        cnbc,
        wallstreetjournal,
        nasdaq,
        businessInsider,
        marketwatch
      ];
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
      const channels: Array<Promise<Channel>> = s.channels.map(
        async (c: Channel) => {
          const channel = new Channel({
            name: c.name,
            station: s.name,
            url: c.url,
            articles: []
          });

          // Load the articles for the current channel
          return this.loadArticles(channel)
            .then(articles => {
              channel.articles = articles;

              return channel;
            })
            .catch(error => {
              return error;
            });
        }
      );
      Promise.all(channels)
        .then(ch => {
          resolve(ch);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  // Takes in a channel and returns an array of articles
  private loadArticles = async (channel: Channel): Promise<Array<Article>> => {
    return new Promise((resolve, reject) => {
      // Use RSS Parser to parse RSS Feed into JSON
      this.parser.parseURL(channel.url).then(articles => {
        // Parse JSON into array of articles
        this.articleParser
          .parseArticles(articles, channel)
          .then(parsedArticles => {
            resolve(parsedArticles);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  };
}
