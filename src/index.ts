import { Telegraf } from "telegraf";
import { config } from "./consts";
import { logger, getPrisma, whiskey } from "./functions";
import { Drank, User } from './classes'

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

  const user = new User(ctx.message.from.id)
  await user.init();
  const drank: Drank = whiskey(user);
  if (drank.now == -1) {
    let message;
    let withHTML;

    if (ctx.message.from.username) message = "@" + ctx.message.from.username;
    else {
      message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
      withHTML = 1;
    };

    message += ` ты уже пил виски недавно! Тебе нужно немного отойти.\n\nПопробуй снова через ${drank.cooldown}`;

    if (withHTML) return ctx.replyWithHTML(message);
    return ctx.reply(message);
  }

  let message;
  let withHTML;

  if (ctx.message.from.username) message = "@" + ctx.message.from.username;
  else {
    message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
    withHTML = 1;
  };

  message =
    message +
    ` ты выпил ${drank.now.toString()} литров виски, красава. За все время ты бахнул ${drank.every.toFixed(1)} литров`;
  if (withHTML) return ctx.replyWithHTML(message);
  return ctx.reply(message);
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
