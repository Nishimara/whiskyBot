import { Context } from 'telegraf';
import { User } from '../classes';

export const info = async (ctx: Context): Promise<void | object> => {
    // specify a better type for ctx?
    if (!ctx.chat || !ctx.message || !ctx.from) return; // костыль      ^^^
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

    message += ` твоя статистика:\n\nВыпито в этом чате: ${
        Number((user.getAmount() % 1).toFixed(1)) == 0
            ? user.getAmount().toFixed(0)
            : user.getAmount().toFixed(1)
    } литров\nМонет: ${user.getMoney()}`;

    if (withHTML) return ctx.replyWithHTML(message);

    return ctx.reply(message);
};
