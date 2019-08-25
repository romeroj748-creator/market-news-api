import { Station } from "src/models/station/station.model";
import { FeedReader } from "./../data/feeds/feed-reader.data";
import { FeedSearcher } from "./../data/feeds/feed-searcher.data";
import { StationParser } from "./../data/stations/station-parser.data";
import { StationReader } from "./../data/stations/station-reader.data";
import { StationScanner } from "./../data/stations/station-scanner.data";
import { Thread } from "./../tools/thread";

export class MarketNewsAPI {
  private stationScanner: StationScanner;
  private stationReader: StationReader;
  private stationParser: StationParser;
  private feedReader: FeedReader;
  private feedSearcher: FeedSearcher;

  constructor() {
    this.stationScanner = new StationScanner();
    this.stationReader = new StationReader();
    this.stationParser = new StationParser();
    this.feedReader = new FeedReader();
    this.feedSearcher = new FeedSearcher();
  }

  public autoScan = async (): Promise<void> => {
    console.log("Started autoscan.");
    while (true) {
      // Scan Internet for Articles
      this.checkForNewArticles();
      // Parse saved data into feeds
      this.createFeeds();
      await new Thread().sleep(60000);
    }
  };

  public createFeeds = (): void => {
    this.feedReader.createFeeds();
  };

  // Uses Station Scanner to scan recent News Station Data
  private scanStations = async (): Promise<Array<Station>> => {
    return this.stationScanner.scanStations().then(stations => {
      return stations;
    });
  };

  // Uses Station Reader to read saved News Station Data
  private readStations = async (): Promise<Array<Station>> => {
    return this.stationReader.readStationsFromFile().then(stations => {
      return stations;
    });
  };

  private checkForNewArticles(): void {
    this.scanStations().then(scannedStations => {
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
                this.stationScanner.saveStations(scannedStations).then(() => {
                  // console.log("Saved stations");
                });
              });
          });
        });
    });
  }
}
