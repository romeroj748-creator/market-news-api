import { YoutubeChannel } from "./../../models/youtube/youtube-channel.model";
import { YoutubeVideo } from "./../../models/youtube/youtube-video.model";

export class YoutubeParser {
  constructor() {}

  public parseChannel = (channelData: any): YoutubeChannel => {
    const channel = new YoutubeChannel();
    if (
      channelData !== undefined &&
      channelData.items !== undefined &&
      channelData.items instanceof Array
    ) {
      channelData.items.forEach((i: any) => {
        const video = new YoutubeVideo();
        if (i.id !== undefined && i.id.videoId !== undefined) {
          video.id = i.id.videoId;
        }
        const snippet = i.snippet;
        if (snippet !== undefined) {
          if (snippet.publishedAt !== undefined) {
            video.datePosted = new Date(snippet.publishedAt);
          }
          if (snippet.channelId !== undefined) {
            channel.id = snippet.channelId;
            video.channelId = snippet.channelId;
          }
          if (snippet.title !== undefined) {
            video.title = snippet.title;
          }
          if (snippet.description !== undefined) {
            video.description = snippet.description;
          }
          if (
            snippet.thumbnails !== undefined &&
            snippet.thumbnails.high !== undefined &&
            snippet.thumbnails.high.url !== undefined
          ) {
            video.thumbnailUrl = snippet.thumbnails.high.url;
          }
          if (snippet.channelTitle !== undefined) {
            channel.title = snippet.channelTitle;
            video.channelTitle = snippet.channelTitle;
          }
        }
        channel.videos.push(video);
      });
    }

    return channel;
  };

  public mergeVideos = async (
    channels: Array<YoutubeChannel>,
    maxVideos: number
  ): Promise<Array<YoutubeVideo>> => {
    return new Promise<Array<YoutubeVideo>>((resolve, reject) => {
      const videos: Array<YoutubeVideo> = [];
      channels.forEach(c => {
        c.videos.forEach(v => {
          videos.push(v);
        });
      });

      // Sort the videos by date desc
      videos.sort((a: YoutubeVideo, b: YoutubeVideo) => {
        if (a.datePosted > b.datePosted) {
          return -1;
        }
        if (a.datePosted < b.datePosted) {
          return 1;
        }

        return 0;
      });

      resolve(videos.splice(0, maxVideos));
    });
  };
}
