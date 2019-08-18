import { Feed } from "src/models/feed/feed.model";
import { Stations } from "./../data/stations/stations.data";

export class MarketNews {
  private stations: Stations;
  // private feeds: Array<Feed>; // Feature coming soon

  constructor() {
    this.stations = new Stations();
  }

  public listStations(): void {
    const stations = this.stations.getStations();
  }
}
