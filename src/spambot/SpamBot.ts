import { DiscordConnector } from "../DiscordConnector";
import { sleep } from "../utils";
import phraselist from "./phraselist";
import { getRandomIntegerInRange } from "./utils";

class SpamBot {
  #connector: DiscordConnector;
  #intervalTimerFrom: number = 3000;
  #intervalTimerTo: number = 6000;

  running: boolean = false;
  #phraseList: string[] = [];

  constructor(
    _authorizationToken: string,
    _channelId: string,
    _intervalTimerFrom: number,
    _intervalTimerTo: number
  ) {
    this.#connector = new DiscordConnector(_channelId, _authorizationToken);
    this.#setPhraseList();
    this.#intervalTimerFrom = _intervalTimerFrom;
    this.#intervalTimerTo = _intervalTimerTo;
  }

  #setPhraseList() {
    this.#phraseList = phraselist;
  }

  #removeIndexFromPhraseList(index: number) {
    this.#phraseList.splice(index, 1);
  }
  #getPhraseAtIndex(index: number) {
    return this.#phraseList[index];
  }

  #getRandomPhrase(): string {
    if (this.#phraseList.length > 0) {
      const randIndex = getRandomIntegerInRange(0, this.#phraseList.length);
      const phrase = this.#getPhraseAtIndex(randIndex);
      this.#removeIndexFromPhraseList(randIndex);
      return phrase;
    } else {
      this.#setPhraseList();
      return this.#getRandomPhrase();
    }
  }
  async #runBot() {
    while (this.running) {
      const phrase = this.#getRandomPhrase();
      this.#connector.sendMessage(phrase);
      await sleep(
        getRandomIntegerInRange(this.#intervalTimerFrom, this.#intervalTimerTo)
      );
    }
  }

  async start() {
    this.running = true;
    await this.#runBot();
  }
  stop() {
    this.running = false;
  }
}

export { SpamBot };
