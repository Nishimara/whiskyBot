import { chats } from '@prisma/client';
import { getPrisma } from '.';

export let getChat = async (userId: number, chatId: number): Promise<chats> => {
    let res = await getPrisma().chats.findMany({
        where: {
            AND: [
                {
                    chatId: chatId
                },
                {
                    userId: userId
                }
            ]
        }
    });

    if (res.length == 0) {
        await getPrisma().chats.create({
            data: {
                chatId: chatId,
                userId: userId,
                totalAmount: 0
            }
        });
        getChat(userId, chatId);
    }

    return res[0];
};
