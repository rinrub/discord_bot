require("@babel/register")();
import { BasiliskGame } from "./basiliskGame/BasiliskGame";
import { SpamBot } from "./spambot/SpamBot";

require("dotenv").config();

const app = async () => {
  // const game = new BasiliskGame(
  //   process.env.DISCORD_AUTHENTICATION_TOKEN as string,
  //   process.env.DISCORD_CHANNEL_ID as string,
  //   process.env.DISCORD_USER_ID as string,
  //   6100
  // );
  // await game.start();
  const Bot = new SpamBot(
    process.env.DISCORD_AUTHENTICATION_TOKEN as string,
    process.env.DISCORD_CHANNEL_ID as string,
    3000,
    6000
  );
  await Bot.start();
};
app();
