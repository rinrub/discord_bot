import { DiscordConnector } from "../DiscordConnector";
import phraselist from "./phraselist";

class SpamBot {
  #connector: DiscordConnector;
  #intervalTimer: number;
  running: boolean = false;
  #userId: string;
  #phraseList: string[];
  #usedPhrasesList: string[];

  constructor(
    _authorizationToken: string,
    _channelId: string,
    _userId: string
  ) {
    this.#connector = new DiscordConnector(_channelId, _authorizationToken);
    this.#userId = _userId;
    this.#phraseList = phraselist;
  }

  start() {
    while (this.running) {
      for (let index = 0; index < this.#phraseList.length; index++) {
        const phrase = this.#phraseList[index];
        this.#connector.sendMessage(phrase);
      }
    }
  }
}
