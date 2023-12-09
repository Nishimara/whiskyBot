import { Telegraf } from 'telegraf';
import { config, logger } from './consts';
import { whiskey, handler } from './functions';
import { Drank, User } from './classes';
import { info } from './commands';

const bot = new Telegraf(config.token);

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
    // TODO: move all this code to commands/whiskey.ts
    if (ctx.chat.type == 'private') return;

    const user = new User(ctx.message.from.id);

    await user.init();
    let message;
    let withHTML;

    const drank: Drank = whiskey(user);

    if (drank.now == -1) {
        if (!drank.cooldown) return;

        if (ctx.message.from.username)
            message = '@' + ctx.message.from.username;
        else {
            message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
            withHTML = 1;
        }

        message += ` ты уже пил виски недавно! Тебе нужно немного отойти.\nВыпито ${
            Number((user.getAmount() % 1).toFixed(1)) == 0
                ? user.getAmount().toFixed(0)
                : user.getAmount().toFixed(1)
        } литров.\n\nПопробуй снова через ${(drank.cooldown / (1000 * 60))
            .toString()
            .match(/\d+/)} м. ${((drank.cooldown / 1000) % 60)
            .toString()
            .match(/\d+/)} с.`;

        logger.push(
            `Cooldown triggered with ms ${drank.cooldown}`,
            ctx.message.from.id
        );

        if (withHTML) return ctx.replyWithHTML(message);

        return ctx.reply(message);
    }

    if (ctx.message.from.username) message = '@' + ctx.message.from.username;
    else {
        message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
        withHTML = 1;
    }
    message += ` ты выпил ${
        drank.now
    } литров виски, красава. За все время ты бахнул ${drank.every.toFixed(
        1
    )} литров`;

    logger.push(`Added ${drank.now} liters of whisky`, ctx.message.from.id);

    if (withHTML) return ctx.replyWithHTML(message);

    return ctx.reply(message);
});

bot.command('info', async (ctx) => {
    await info(ctx);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
