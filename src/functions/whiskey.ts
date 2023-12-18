import { Drank, User } from '../classes';
import { cooldown, random } from '../consts';

export const whiskey = async (user: User): Promise<Drank> => {
    const cd: number = Date.now() - Number(user.getLastTimeDrank());

    if (cd <= cooldown)
        return new Drank(-1, user.getDrankAll(), 0, cooldown - cd);

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

    user.setDrankAll(now);
    user.setMoney(money);

    return new Drank(now, user.getDrankAll(), money, cooldown - cd);
};
