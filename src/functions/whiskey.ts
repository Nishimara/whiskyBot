import { Drank, User } from '../classes';
import { cooldown, random } from '../consts';
import { getChat } from '.';

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

    const res = await getChat(user.getId(), chatId, now);

    user.setDrankAll(now);
    user.setMoney(money);

    return new Drank(
        now,
        user.getDrankAll(),
        money,
        cooldown - cd,
        res.totalAmount ? res.totalAmount : now
    );
};
