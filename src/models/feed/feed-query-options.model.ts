export class FeedQueryOptions {
  public name: string;
  public stations: Array<string>;
  public channels: Array<string>;
  public dateStart: Date;
  public dateEnd: Date;
  public titleContains: Array<string>;
  public contentContains: Array<string>;
  public resultLimit: number;

  constructor(data?: any) {
    const defaults = {
      name: "",
      stations: [],
      channels: [],
      dateStart: 0,
      dateEnd: 0,
      titleContains: [],
      contentContains: [],
      resultLimit: 10,
      ...data
    };
    this.name =
      defaults.name !== undefined && typeof defaults.name === "string"
        ? defaults.name
        : "";
    this.stations =
      defaults.stations !== undefined && defaults.stations instanceof Array
        ? defaults.stations
        : [];
    this.channels =
      defaults.channels !== undefined && defaults.channels instanceof Array
        ? defaults.channels
        : [];
    this.dateStart =
      defaults.dateStart !== undefined && typeof defaults.dateStart === "string"
        ? new Date(defaults.dateStart)
        : new Date(0);
    this.dateEnd =
      defaults.dateEnd !== undefined && typeof defaults.dateEnd === "string"
        ? new Date(defaults.dateEnd)
        : new Date(0);
    this.titleContains =
      defaults.titleContains !== undefined &&
      defaults.titleContains instanceof Array
        ? defaults.titleContains
        : [];
    this.contentContains =
      defaults.contentContains !== undefined &&
      defaults.contentContains instanceof Array
        ? defaults.contentContains
        : [];
    this.resultLimit =
      defaults.resultLimit !== undefined &&
      typeof defaults.resultLimit === "number"
        ? defaults.resultLimit
        : 10;
  }
}
