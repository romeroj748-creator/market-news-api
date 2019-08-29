import { FeedReader } from "./../data/feeds/feed-reader.data";
import { StationScanner } from "./../data/stations/station-scanner.data";
import { Thread } from "./../tools/thread";

export class MarketNewsAPI {
  private stationScanner: StationScanner;
  private feedReader: FeedReader;
  private thread: Thread;

  constructor() {
    this.stationScanner = new StationScanner();
    this.feedReader = new FeedReader();
    this.thread = new Thread();
  }

  public autoScan = async (): Promise<void> => {
    console.log("Started autoscan.");
    while (true) {
      // Scan Internet for Articles
      this.stationScanner.scanForNewArticles();
      // Parse saved data into feeds
      this.createFeeds();
      await this.thread.sleep(60000);
    }
  };

  public createFeeds = (): void => {
    this.feedReader.createFeeds();
  };
}
