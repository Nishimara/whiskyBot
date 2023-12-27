import { chats } from '@prisma/client';
import { getPrisma } from '.';

export const getChat = async (
    userId: number,
    chatId: number,
    value?: number
): Promise<chats> => {
    const res = await getPrisma().chats.findMany({
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
                totalAmount: value ? value : 0
            }
        });
        res[0] = {
            id: BigInt(0),
            chatId: BigInt(chatId),
            userId: BigInt(userId),
            totalAmount: value ? value : 0
        };
    } else {
        if (value) {
            await getPrisma().chats.updateMany({
                data: {
                    totalAmount: res[0].totalAmount + value
                },
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
            res[0].totalAmount += value;
        }
    }

    return res[0];
};
