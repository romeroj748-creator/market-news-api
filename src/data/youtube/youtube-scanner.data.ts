import { IncomingMessage } from "http";
import * as https from "https";
import { environment } from "./../../environments/environment";
import { YoutubeChannel } from "./../../models/youtube/youtube-channel.model";
import { YoutubeParser } from "./../youtube/youtube-parser.data";

export class YoutubeScanner {
  private youtubeParser: YoutubeParser;

  /* URLs */
  private apiUrl = "https://www.googleapis.com/youtube/v3/search";
  private authUrl = `?key=${environment.youtubeDataApiKey}`;
  private baseUrl = `${this.apiUrl}${this.authUrl}`;

  /* Query Params */
  private listRecentVideos = "part=snippet,id&order=date&maxResults=20";

  /* Channel IDs */
  private cnbcId = "UCrp_UI8XtuYfpiqluWLD7Lw";
  private bloombergId = "UCIALMKvObZNtJ6AmdCLP7Lg";

  constructor() {
    this.youtubeParser = new YoutubeParser();
  }

  public scanChannels = async (): Promise<Array<YoutubeChannel>> => {
    const channelIds = [this.cnbcId, this.bloombergId];
    const channelsData = channelIds.map(async (cid: string) => {
      return this.scanChannel(cid).then(channel => {
        return channel;
      });
    });

    return Promise.all(channelsData).then((channels: Array<YoutubeChannel>) => {
      return channels;
    });
  };

  public scanChannel = async (channelId: string): Promise<YoutubeChannel> => {
    const url = `${this.baseUrl}&channelId=${channelId}&${this.listRecentVideos}`;

    return new Promise<YoutubeChannel>((resolve, reject) => {
      https
        .get(url, (response: IncomingMessage) => {
          let data = "";
          response.on("data", chunk => {
            data += chunk;
          });

          response.on("end", () => {
            const ytChannel = this.youtubeParser.parseChannel(JSON.parse(data));
            resolve(ytChannel);
          });
        })
        .on("error", error => {
          reject(error);
        });
    });
  };
}
