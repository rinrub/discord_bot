//@ts-ignore
import fetch, { Headers } from "node-fetch";

class DiscordService {
  #headers: any;
  #baseURI: string = "https://discord.com/api/v9/channels/";
  constructor(_authorizationToken: string) {
    this.#headers = new Headers({});
    this.#headers.append("authorization", _authorizationToken);
    this.#headers.append("content-type", "application/json");
  }
  async #get(uri: string) {
    return fetch(uri, {
      headers: this.#headers,
      method: "GET",
    });
  }
  async #post(uri: string, content: any) {
    return fetch(uri, {
      headers: this.#headers,
      body: JSON.stringify(content),
      method: "POST",
    });
  }
  async postMessage(channelId: string, message?: string) {
    try {
      const res = await this.#post(`${this.#baseURI}${channelId}/messages`, {
        content: message,
      } as any);
      return res.json();
    } catch (err) {
      console.error(err);
    }
  }
  async getMessage(channelId: string, filter: string) {
    try {
      const res = await this.#get(
        `${this.#baseURI}${channelId}/messages?${filter}`
      );
      if (res.ok) {
        return await res.json();
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export { DiscordService };
