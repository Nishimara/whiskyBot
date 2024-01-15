import { Context } from 'telegraf';
import { Update, Message } from '@telegraf/types';
import { prisma } from '../consts';

export const top = async (
    ctx: Context<Update.MessageUpdate<Message.TextMessage>>
): Promise<void | object> => {
    if (ctx.chat.type == 'private') return;
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
    let ending: string;

    // forEach doesn't really like async functions
    for (const elem of chatters) {
        switch (Math.floor(elem.totalAmount).toString().slice(-1)) {
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

        message += `\n${++count}: ${
            (await ctx.getChatMember(Number(elem.userId))).user.first_name
        } ${
            Number(elem.totalAmount.toFixed(1)) % 1 == 0
                ? elem.totalAmount.toFixed(0)
                : elem.totalAmount.toFixed(1)
        } литр${ending}`;
    }

    return await ctx.reply(message);
};
