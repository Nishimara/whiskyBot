import { Update, Message } from '@telegraf/types';
import { Context } from 'telegraf';
import { User } from '../classes';

export const info = async (
    ctx: Context<Update.MessageUpdate<Message.TextMessage>>
): Promise<void | object> => {
    if (ctx.chat.type == 'private') return;

    const user = new User(ctx.from.id);
    let withHTML;
    let message;

    await user.init();

    if (ctx.message.from.username) message = '@' + ctx.message.from.username;
    else {
        message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
        withHTML = 1;
    }

    let ending: string;

    switch (Math.floor(user.getDrankAll()).toString().slice(-1)) {
        case '0':
            ending = 'ов';
            break;
        case '1':
            ending = '';
            break;
        case '2':
            ending = 'ов';
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

    message += ` твоя статистика:\n\nВыпито в этом чате: ${
        Number((user.getDrankAll() % 1).toFixed(1)) == 0
            ? user.getDrankAll().toFixed(0)
            : user.getDrankAll().toFixed(1)
    } литр${ending}\nВискоинов: ${user.getMoney()}`;

    if (withHTML) return ctx.replyWithHTML(message);

    return ctx.reply(message);
};
