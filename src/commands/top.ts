import { Context } from 'telegraf';
import { Update, Message } from '@telegraf/types';
import { prisma } from '../consts';
import { formatHTMLString } from '../functions';

export const top = async (
    ctx: Context<Update.MessageUpdate<Message.TextMessage>>
): Promise<object> => {
    const chatters = await prisma.chats.findMany({
        orderBy: [
            {
                totalAmount: 'desc'
            }
        ],
        where: {
            chatId: ctx.chat.id
        },
        take: 10
    });

    let message = 'Топ 10 чата по количеству выпитого виски:';
    let count = 0;

    // forEach doesn't really like async functions
    for (const elem of chatters) {
        message += `\n${++count}: <a href="tg://user?id=${
            elem.userId
        }">${formatHTMLString(
            (await ctx.getChatMember(Number(elem.userId))).user.first_name
        )}</a> ${
            Number(elem.totalAmount.toFixed(1)) % 1 == 0
                ? elem.totalAmount.toFixed(0)
                : elem.totalAmount.toFixed(1)
        }`;
    }

    return await ctx.replyWithHTML(message, {
        disable_notification: true
    });
};
