import { getPrisma } from '.';
import { Drank, User } from '../classes';
import { cooldown, random } from '../consts';

export const whiskey = async (user: User, chatId: number): Promise<Drank> => {
    const cd: number = Date.now() - Number(user.getLastTimeDrank());

    if (cd <= cooldown)
        return new Drank(-1, user.getDrankAll(), 0, cooldown - cd, 0);

    const now: number = parseFloat(
        (
            Math.random() * (random.drankMax - random.drankMin) +
            random.drankMin
        ).toFixed(1)
    );
    const money: number = Math.floor(
        Math.floor(
            Math.random() * (random.moneyMax - random.moneyMin + 1) +
                random.moneyMin
        )
    );

    let res = await getPrisma().chats.findMany({
        where: {
            AND: [
                {
                    chatId: chatId
                },
                {
                    userId: user.getId()
                }
            ]
        }
    });

    await getPrisma().chats.updateMany({
        data: {
            totalAmount: res[0].totalAmount + now
        },
        where: {
            AND: [
                {
                    chatId: chatId
                },
                {
                    userId: user.getId()
                }
            ]
        }
    });
    if (res.length == 0) {
        await getPrisma().chats.create({
            data: {
                chatId: chatId,
                userId: user.getId(),
                totalAmount: now
            }
        });
    }
    user.setDrankAll(now);
    user.setMoney(money);

    return new Drank(
        now,
        user.getDrankAll(),
        money,
        cooldown - cd,
        res.length == 0 ? now : res[0].totalAmount + now
    );
};
