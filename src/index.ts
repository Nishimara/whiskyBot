import { Telegraf } from 'telegraf';
import { handler } from './functions';
import { info, whiskeyCommand } from './commands';

const bot = new Telegraf(Bun.env.TELEGRAM_TOKEN!);

bot.start((ctx) => {
    // TODO: if a chat with new user then mark it in logs
    if (ctx.chat.type == 'private') {
        ctx.reply(
            'Привет! Я бот который позволяет пить виски раз в час.\n\nДобавь меня в беседу и пропиши /whiskey'
        );
    } else {
        ctx.reply('Привет! Я бот который позволяет пить виски раз в час.');
    }
});

bot.catch((err, ctx) => {
    handler(err, ctx);
});

bot.command('whiskey', async (ctx) => {
    whiskeyCommand(ctx);
});

bot.command('info', async (ctx) => {
    info(ctx);
});

bot.launch();
console.log('Started!');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
