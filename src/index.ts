import { Telegraf } from 'telegraf';
import { config, ignoreErrorCodes } from './consts';
import { whiskey } from './functions';
import { Drank, User, Logger } from './classes';

const bot = new Telegraf(config.token);
const logger = new Logger();

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
    interface iErr {
        UserId?: number;
        message?: string;
    } // there has to be a better solution? rewrite
    const error: iErr = err!;
    const regex: number = Number(error.message?.match(/[^Error: ]\S\d+(?=: )/)); // this regex can be better
    let isErr;

    ignoreErrorCodes.forEach((elem) => {
        if (elem === regex) isErr = true;
    });

    if (isErr) return;

    logger.push(String(err), ctx.from?.id); // possibly some highlighting to easily see errors in db?
});

bot.command('whiskey', async(ctx) => {
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

        message += ` ты уже пил виски недавно! Тебе нужно немного отойти.\n\nПопробуй снова через ${
            Number((drank.cooldown / (1000 * 60)).toFixed(0)) - 1
        } м. ${(drank.cooldown / 1000 % 60).toFixed(0)} с.`;
        // thing above can sometime return 60 seconds
        // nah i'm too lazy to fix that

        logger.push(`Cooldown triggered with ms ${drank.cooldown}`, ctx.message.from.id);

        if (withHTML) return ctx.replyWithHTML(message);

        return ctx.reply(message);
    }

    if (ctx.message.from.username) message = '@' + ctx.message.from.username;
    else {
        message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
        withHTML = 1;
    }
    message += ` ты выпил ${drank.now} литров виски, красава. За все время ты бахнул ${drank.every.toFixed(1)} литров`;

    logger.push(`Added ${drank.now} liters of whisky`, ctx.message.from.id);
    
    if (withHTML) return ctx.replyWithHTML(message);

    return ctx.reply(message);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));