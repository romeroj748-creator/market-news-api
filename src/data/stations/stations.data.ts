import { Station } from "./../../models/station/station.model";
import cnbc = require("./json/cnbc.json");
import marketwatch = require("./json/marketwatch.json");
import wallstreetjournal = require("./json/wallstreetjournal.json");

export class Stations {
  private stations: Array<Station>;

  constructor() {
    this.stations = [];
    this.populateStations();
  }

  public getStations(): Array<Station> {
    return this.stations;
  }

  public reloadStations(): void {
    this.populateStations();
  }

  private populateStations(): void {
    const stations = [cnbc, marketwatch, wallstreetjournal];
    this.stations = stations.map(s => {
      return new Station({
        name: s.name,
        channel: s.channels
      });
    });
  }
}
