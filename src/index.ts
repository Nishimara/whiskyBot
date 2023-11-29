import { readFileSync } from "fs";
import { iConfig } from "./interfaces";
import { Telegraf } from "telegraf";
import { whiskey } from "./methods/whiskey";
import { Drank } from "./classes/Drank";

const config: iConfig = JSON.parse(readFileSync("config.json", "utf-8"));

const bot = new Telegraf(config.token);

bot.start((ctx) => {
  if (ctx.chat.type == "private") {
    ctx.reply(
      "Привет! Я бот который позволяет пить виски раз в час.\n\nДобавь меня в беседу и пропиши /whiskey"
    );
  } else {
    ctx.reply(`Привет! Я бот который позволяет пить виски раз в час.`);
  }
});

bot.command("whiskey", async (ctx) => {
  if (ctx.chat.type == "private") return 1;
  const drank: Drank = whiskey();

  let message;

  if (ctx.message.from.username) message = "@" + ctx.message.from.username;
  else message = ctx.message.from.first_name; // TODO: tag with telegram id
  message =
    message +
    ` ты выпил ${drank.now.toString()} литров виски, красава. За все время ты бахнул ${drank.every.toString()} литров`;
  return ctx.reply(message);
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
