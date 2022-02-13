import { DiscordConnector } from "../DiscordConnector";
import { sleep } from "../utils";

class BasiliskGame {
  #connector: DiscordConnector;
  #sleepTime: number;
  playing: boolean = false;
  #userId: string;
  deadRegex: RegExp = /([0-9]+) hours and ([0-9]+)/;
  aliveRegex: RegExp = /([0-9]+) total/;
  constructor(
    _authorizationToken: string,
    _channelId: string,
    _userId: string,
    _sleepTime: number
  ) {
    this.#connector = new DiscordConnector(_channelId, _authorizationToken);
    this.#sleepTime = _sleepTime;
    this.#userId = _userId;
  }
  #setSleepTime(newSleepTime: number) {
    this.#sleepTime = newSleepTime;
  }
  async #playGame() {
    while (this.playing) {
      await this.#connector.sendMessage("!collect");
      const messages = await this.#connector.getLastMessage("limit=1");
      const message = messages[0];
      if (
        message.mentions != null &&
        message.mentions.length > 0 &&
        message.mentions[0].id == this.#userId
      ) {
        const match = message.content.match(this.deadRegex);
        if (match) {
          const hours = parseInt(match[1], 10);
          const minutes = parseInt(match[2], 10);
          const totalSeconds = hours * 60 * 60 + minutes * 60;
          console.log(
            `I have been eaten and need to sleep for ${totalSeconds} seconds.`
          );
          this.#setSleepTime(totalSeconds * 1000);
        }
        const match2 = message.content.match(this.aliveRegex);
        if (match2) {
          console.log(`I'm alive and have ${match2[1]} coins.`);
          if (parseInt(match2[1], 10) >= 400) {
            console.log(`I have many coins. Stopping.`);
            return;
          }
        }
      }
      await sleep(this.#sleepTime);
    }
  }

  async start() {
    this.playing = true;
    this.#playGame();
  }
  stop() {
    this.playing = false;
  }
}

export { BasiliskGame };
