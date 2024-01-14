import { Context } from 'telegraf';
import { Update, Message } from '@telegraf/types';
import { prisma } from '../consts';

export const top = async (
    ctx: Context<Update.MessageUpdate<Message.TextMessage>>
): Promise<void> => {
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

    let message = 'Топ 10 чата по количеству выпитого виски:\n';
    let count = 0;

    for (const elem of chatters) {
        // forEach doesn't really like async functions
        message += `${++count}: <a href="tg://user?id=${elem.userId}">${
            (await ctx.getChatMember(Number(elem.userId))).user.first_name
        }</a> ${
            Number(elem.totalAmount.toFixed(1)) % 1 == 0
                ? elem.totalAmount.toFixed(0)
                : elem.totalAmount.toFixed(1)
        }\n`;
    }

    await ctx.replyWithHTML(message, {
        disable_notification: true
    });
};
