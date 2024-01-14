import { Update, Message } from '@telegraf/types';
import { Context } from 'telegraf';
import { User } from '../classes';
import { getChat } from '../functions';

export const info = async (
    ctx: Context<Update.MessageUpdate<Message.TextMessage>>
): Promise<void | object> => {
    if (ctx.chat.type == 'private') return;

    const user = new User(ctx.from.id);
    let withHTML = false;
    let message;

    await user.init();
    const chat = await getChat(user.getId(), ctx.chat.id);

    if (!chat) return;
    if (ctx.message.from.username) message = '@' + ctx.message.from.username;
    else {
        message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
        withHTML = true;
    }

    let ending: string;
    let endingAll: string;

    switch (Math.floor(chat.totalAmount).toString().slice(-1)) {
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

    switch (Math.floor(user.getDrankAll()).toString().slice(-1)) {
        case '0':
            endingAll = 'ов';
            break;
        case '1':
            endingAll = '';
            break;
        case '2':
            endingAll = 'ов';
            break;
        case '3':
            endingAll = 'а';
            break;
        case '4':
            endingAll = 'а';
            break;
        default:
            endingAll = 'ов';
            break;
    }

    message += ` твоя статистика:\n\nВыпито во всех чатах: ${
        Number((user.getDrankAll() % 1).toFixed(1)) == 0
            ? user.getDrankAll().toFixed(0)
            : user.getDrankAll().toFixed(1)
    } литр${endingAll}\nВыпито в этом чате: ${
        Number((chat.totalAmount % 1).toFixed(1)) == 0
            ? chat.totalAmount.toFixed(0)
            : chat.totalAmount.toFixed(1)
    } литр${ending}\nВискоинов: ${user.getMoney()}`;

    if (withHTML) return ctx.replyWithHTML(message);

    return await ctx.reply(message);
};
