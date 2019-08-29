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
import { StationParser } from "./station-parser.data";
import { StationReader } from "./station-reader.data";

export class StationScanner {
  private rssParser: Parser;
  private articleParser: ArticleParser;
  private stationParser: StationParser;
  private stationReader: StationReader;
  private fw: FileWriter;
  private stationData: Array<any> = [
    cnbc,
    wallstreetjournal,
    nasdaq,
    businessInsider
  ];

  constructor() {
    this.fw = new FileWriter();
    this.rssParser = new Parser();
    this.articleParser = new ArticleParser();
    this.stationParser = new StationParser();
    this.stationReader = new StationReader();
  }

  // Writes Array of Stations to Disk
  public saveStations = async (stations: Array<Station>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.fw.writeObjectToFile(stations, "./src/data/stations/stations.txt");
      resolve();
    });
  };

  public scanForNewArticles(): void {
    this.scanAllStations().then(scannedStations => {
      this.stationParser
        .extractArticlesMap(scannedStations)
        .then(scannedStationsMap => {
          this.stationReader.readStationsFromFile().then(readStations => {
            this.stationParser
              .extractArticlesMap(readStations)
              .then(readStationsMap => {
                scannedStationsMap.forEach(s => {
                  const key = s.title;
                  if (readStationsMap.has(key)) {
                    // console.log("Found existing article");
                  } else {
                    // console.log("Found new Article");
                    console.log(JSON.stringify(s, null, 3));
                  }
                });
                this.saveStations(scannedStations).then(() => {
                  // console.log("Saved stations");
                });
              });
          });
        });
    });
  }

  // Scans all stations Loaded from loadStations()
  private scanAllStations = async (): Promise<Array<Station>> => {
    return new Promise<Array<Station>>((resolve, reject) => {
      this.loadStations().then((stations: Array<Station>) => {
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

  // Read Array<Station> from stations.txt
  private loadStations = async (): Promise<Array<Station>> => {
    return new Promise<Array<Station>>((resolve, reject) => {
      const stations = this.stationData.map(s => {
        return new Station({
          name: s.name,
          channels: s.channels
        });
      });
      resolve(stations);
    });
  };

  // Takes Array<Channel> as Input and Populates each Channels Array<Article>
  private loadChannels = async (s: Station): Promise<Array<Channel>> => {
    return new Promise<Array<Channel>>((resolve, reject) => {
      // Create a Promise<Array<Channel>> so we can async populate articles
      const channels: Array<Promise<Channel>> = s.channels.map(
        async (c: Channel) => {
          const channel = new Channel({
            name: c.name,
            station: s.name,
            url: c.url,
            articles: []
          });

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

      // Asynchronously populate all the Array<Channel>
      Promise.all(channels)
        .then(ch => {
          resolve(ch);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  // Takes Channel as Input & Parses the URL into Array<Article>
  private loadArticles = async (channel: Channel): Promise<Array<Article>> => {
    return new Promise((resolve, reject) => {
      // Use RSS Parser to parse RSS Feed into JSON
      this.rssParser.parseURL(channel.url).then(articles => {
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
