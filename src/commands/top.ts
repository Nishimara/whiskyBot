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

    chatters.forEach(async (elem) => {
        message += `${++count}: <a href="tg://user?id=${elem.userId.toString()}">placeholder</a> ${
            Number(elem.totalAmount.toFixed(1)) % 1 == 0
                ? elem.totalAmount.toFixed(0)
                : elem.totalAmount.toFixed(1)
        }\n`;
    });

    ctx.replyWithHTML(message, {
        disable_notification: true
    });
};
