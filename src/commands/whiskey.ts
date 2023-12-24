import { Update, Message } from '@telegraf/types';
import { Context } from 'telegraf';
import { User, Drank } from '../classes';
import { whiskey } from '../functions';
import { logger } from '../consts';

export const whiskeyCommand = async (
    ctx: Context<Update.MessageUpdate<Message.TextMessage>>
): Promise<void> => {
    if (ctx.chat.type == 'private') return;

    const user = new User(ctx.message.from.id);

    await user.init();
    let message: string;
    let withHTML: number;
    let ending: string;

    switch (Math.floor(user.getDrankAll()).toString().slice(-1)) {
        case '0':
            ending = 'ов';
            break;
        case '1':
            ending = '';
            break;
        case '2':
            ending = 'а';
            break;
        case '3':
            ending = 'а';
            break;
        case '4':
            ending = 'а';
            break;
        default:
            ending = 'ов';
            break;
    }

    whiskey(user).then((drank: Drank) => {
        if (drank.drankNow == -1) {
            if (!drank.cooldown) return;

            if (ctx.message.from.username)
                message = '@' + ctx.message.from.username;
            else {
                message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
                withHTML = 1;
            }

            message += ` ты уже пил виски недавно! Тебе нужно немного отойти.\nВыпито ${
                Number((drank.drankAll % 1).toFixed(1)) == 0
                    ? drank.drankAll.toFixed(0)
                    : drank.drankAll.toFixed(1)
            } литр${ending}.\nНафармлено ${user.getMoney()} монет.\n\nПопробуй снова через ${(
                drank.cooldown /
                (1000 * 60)
            )
                .toString()
                .match(/\d+/)} м. ${((drank.cooldown / 1000) % 60)
                .toString()
                .match(/\d+/)} с.`;

            logger.push(
                `Cooldown triggered with ms ${drank.cooldown}`,
                ctx.message.from.id
            );

            if (withHTML) ctx.replyWithHTML(message);

            return ctx.reply(message);
        }

        if (ctx.message.from.username)
            message = '@' + ctx.message.from.username;
        else {
            message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
            withHTML = 1;
        }

        switch (Math.floor(drank.drankNow)) {
            case 0:
                ending = 'ов';
                break;
            case 1:
                ending = '';
                break;
            case 2:
                ending = 'а';
                break;
            case 3:
                ending = 'а';
                break;
            case 4:
                ending = 'а';
                break;
            default:
                ending = 'ов';
                break;
        }

        message += ` ты выпил ${
            drank.drankNow
        } литр${ending} виски и заработал ${
            drank.money
        } монет, красава. За все время ты бахнул ${drank.drankAll.toFixed(
            1
        )} литр${ending}`;

        logger.push(
            `Added ${drank.drankNow} liters of whisky`,
            ctx.message.from.id
        );
        logger.push(`Added ${drank.money} moneys`, ctx.message.from.id);

        if (withHTML) return ctx.replyWithHTML(message);

        return ctx.reply(message);
    });
};
