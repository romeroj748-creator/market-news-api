import { Station } from "src/models/station/station.model";
import { StationParser } from "./../data/stations/station-parser.data";
import { StationReader } from "./../data/stations/station-reader.data";
import { StationScanner } from "./../data/stations/station-scanner.data";

export class MarketNewsAPI {
  private stationScanner: StationScanner;
  private stationReader: StationReader;
  private stationParser: StationParser;

  constructor() {
    this.stationScanner = new StationScanner();
    this.stationReader = new StationReader();
    this.stationParser = new StationParser();
  }

  public autoScan = (): void => {
    console.log("Started autoscan.");
    this.checkForNewArticles();
  };

  // Uses Station Scanner to scan recent News Station Data
  public scanStations = async (): Promise<Array<Station>> => {
    return this.stationScanner.scanStations().then(stations => {
      return stations;
    });
  };

  // Uses Station Reader to read saved News Station Data
  public readStations = async (): Promise<Array<Station>> => {
    return this.stationReader.readStationsFromFile().then(stations => {
      return stations;
    });
  };

  public checkForNewArticles(): void {
    this.scanStations().then(scannedStations => {
      this.stationParser
        .extractArticlesMap(scannedStations)
        .then(scannedStationsMap => {
          this.stationReader.readStationsFromFile().then(readStations => {
            this.stationParser
              .extractArticlesMap(readStations)
              .then(readStationsMap => {
                console.log(scannedStationsMap.size);
                scannedStationsMap.forEach(s => {
                  const key = s.title;
                  if (readStationsMap.has(key)) {
                    // console.log("Found existing article");
                  } else {
                    console.log("Found new Article");
                    console.log(JSON.stringify(s, null, 3));
                  }
                });
              });
          });
        });
    });
  }
}
