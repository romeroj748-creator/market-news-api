export class FeedQueryOptions {
  public stations: Array<string>;
  public channels: Array<string>;
  public dateStart: Date;
  public dateEnd: Date;
  public titleContains: string;
  public contentContains: string;
  public resultLimit: number;

  constructor(data?: any) {
    const defaults = {
      stations: [],
      channels: [],
      dateStart: null,
      dateEnd: null,
      titleContains: "",
      contentContains: "",
      resultLimit: 10,
      ...data
    };
    this.stations = defaults.stations;
    this.channels = defaults.channels;
    this.dateStart = defaults.dateStart;
    this.dateEnd = defaults.dateEnd;
    this.titleContains = defaults.titleContains;
    this.contentContains = defaults.titleContains;
    this.resultLimit = defaults.resultLimit;
  }
}
