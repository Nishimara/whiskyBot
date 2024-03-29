import { chats } from '@prisma/client';
import { prisma } from '../consts';

export const getChat = async (
    userId: number,
    chatId: number | bigint,
    value?: number
): Promise<chats> => {
    const res = await prisma.chats.findMany({
        where: {
            AND: [
                {
                    chatId: typeof chatId === 'bigint' ? chatId : BigInt(chatId)
                },
                {
                    userId: userId
                }
            ]
        }
    });

    if (res.length == 0) {
        await prisma.chats.create({
            data: {
                chatId: typeof chatId === 'bigint' ? chatId : BigInt(chatId),
                userId: userId,
                totalAmount: value ? value : 0
            }
        });

        return {
            id: 0,
            chatId: BigInt(chatId),
            userId: BigInt(userId),
            totalAmount: value ? value : 0
        } as chats;
    }

    if (value) {
        await prisma.chats.updateMany({
            data: {
                totalAmount: res[0].totalAmount + value
            },
            where: {
                AND: [
                    {
                        chatId:
                            typeof chatId === 'bigint' ? chatId : BigInt(chatId)
                    },
                    {
                        userId: userId
                    }
                ]
            }
        });
        res[0].totalAmount += value;
    }

    return res[0];
};
