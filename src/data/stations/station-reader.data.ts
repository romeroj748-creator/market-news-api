import { Station } from "src/models/station/station.model";
import { FileReader } from "./../../tools/filereader";

export class StationReader {
  private fr: FileReader;

  constructor() {
    this.fr = new FileReader();
  }

  public readStationsFromFile = async (): Promise<Array<Station>> => {
    const path = "./src/data/stations/stations.txt";

    return this.fr.readObjectFromFile(path).then(stations => {
      return stations;
    });
  };
}
