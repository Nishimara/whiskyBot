import { Update, Message } from '@telegraf/types';
import { Context } from 'telegraf';
import { User } from '../classes';
import { getChat } from '../functions/getChat';

export const info = async (
    ctx: Context<Update.MessageUpdate<Message.TextMessage>>
): Promise<void | object> => {
    if (ctx.chat.type == 'private') return;

    const user = new User(ctx.from.id);
    let withHTML;
    let message;

    await user.init();
    let chat = await getChat(user.getId(), ctx.chat.id);

    if (!chat) return;
    if (ctx.message.from.username) message = '@' + ctx.message.from.username;
    else {
        message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
        withHTML = 1;
    }

    let ending: string;

    let totalAmount: number = chat.totalAmount;

    switch (Math.floor(totalAmount).toString().slice(-1)) {
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
    //зробiш склоны
    message += ` твоя статистика:\n\nВыпито всего: ${user.getDrankAll()}\nВыпито в этом чате: ${
        Number((totalAmount % 1).toFixed(1)) == 0
            ? totalAmount.toFixed(0)
            : totalAmount.toFixed(1)
    } литр${ending}\nВискоинов: ${user.getMoney()}`;

    if (withHTML) return ctx.replyWithHTML(message);

    return ctx.reply(message);
};
