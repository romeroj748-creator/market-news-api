import { Channel } from "../channel/channel.model";

export class Station {
  public name: string;
  public channels: Array<Channel>;

  constructor(data?: any) {
    const defaults = {
      name: "",
      channels: [],
      ...data
    };

    this.name = defaults.name;
    this.channels = defaults.channel.map((c: Channel) => c);
  }
}
