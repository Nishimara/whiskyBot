import { Telegraf } from 'telegraf';
import { handler } from './functions';
import { gamba, info, whiskeyCommand } from './commands';

const bot = new Telegraf(Bun.env.TELEGRAM_TOKEN!);

bot.start(async (ctx) => {
    if (ctx.chat.type != 'private') return;
    await ctx.reply(
        'Привет! Я бот который позволяет пить виски раз в час.\n\nДобавь меня в беседу и пропиши /whiskey'
    );
});

bot.catch((err, ctx) => {
    handler(err, ctx);
});

bot.command('whiskey', async (ctx) => {
    await whiskeyCommand(ctx);
});

bot.command('info', async (ctx) => {
    await info(ctx);
});

bot.command('gamba', async (ctx) => {
    await gamba(ctx);
});

bot.launch();
console.log('Started!');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
