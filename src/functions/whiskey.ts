import { Drank, User } from '../classes';
import { cooldown, random } from '../consts';

export const whiskey = (user: User): Drank => {
    const cd: number = Date.now() - Number(user.getLastTimeDrank());

    if (cd <= cooldown) return new Drank(-1, 0, 0, cooldown - cd);

    const now: number = parseFloat(
        (Math.random() * random.drankMax + random.drankMin).toFixed(1)
    );

    const money: number = Number(
        (Math.random() * random.moneyMax + random.moneyMin).toFixed(0)
    );

    user.setAmount(now);
    user.setMoney(money);

    return new Drank(now, user.getAmount(), money);
};
