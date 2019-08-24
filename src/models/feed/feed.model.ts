import { Channel } from "../channel/channel.model";

export class Feed {
  public name: string;
  public channels: Array<Channel>;

  constructor(data?: any) {
    const defaults = {
      name: "",
      channels: [],
      ...data
    };

    this.name = defaults.name;
    this.channels = defaults.channels;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getChannels(): Array<Channel> {
    return this.channels;
  }

  public addChannel(channel: Channel): void {
    this.channels.push(channel);
  }

  public addChannels(channels: Array<Channel>): void {
    channels.forEach(c => {
      this.addChannel(c);
    });
  }

  public removeChannel(channel: Channel): void {
    const index = this.channels.findIndex(c => c === channel);
    this.channels.splice(index, 1);
  }
}
