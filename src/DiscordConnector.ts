"use strict";

import { DiscordService } from "./DiscordService";

class DiscordConnector {
  #authorizationToken: string;
  #service: DiscordService;
  #channelId: string;

  constructor(_channelId: string, _authorizationToken: string) {
    this.#channelId = _channelId;
    this.#authorizationToken = _authorizationToken;
    this.#service = new DiscordService(this.#authorizationToken);
  }
  getChannelId() {
    return this.#channelId;
  }
  async sendMessage(message?: string): Promise<void> {
    await this.#service.postMessage(this.#channelId, message);
  }
  async getLastMessage(filter: string): Promise<any[]> {
    return await this.#service.getMessage(this.#channelId, filter);
  }
}

export { DiscordConnector };
