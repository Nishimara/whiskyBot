import { readFileSync } from "fs";
import { iConfig } from "./interfaces";
import { Telegraf } from "telegraf";
import { whiskey } from "./methods/whiskey";
import { Drank } from "./classes/Drank";

const config: iConfig = JSON.parse(readFileSync("config.json", "utf-8"));
if (process.env.TOKEN) config.token = process.env.TOKEN;

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
  let withHTML;

  if (ctx.message.from.username) message = "@" + ctx.message.from.username;
  else {
    message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
    withHTML = 1;
  };

  message =
    message +
    ` ты выпил ${drank.now.toString()} литров виски, красава. За все время ты бахнул ${drank.every.toString()} литров`;
  if (withHTML) return ctx.replyWithHTML(message);
  return ctx.reply(message);
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
