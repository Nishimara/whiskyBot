import { Drank, User } from '../classes';
import { cooldown, random } from '../consts';

export const whiskey = async (user: User): Promise<Drank> => {
    const cd: number = Date.now() - Number(user.getLastTimeDrank());

    if (cd > cooldown) {
        const now: number = parseFloat((Math.random() * random.drankMax + random.drankMin).toFixed(1));
        const money: number = Math.floor((Math.random() * random.moneyMax + random.moneyMin));

        user.setDrankAll(now);
        user.setMoney(money);

        const response = new Drank(now, user.getDrankAll(), money, cooldown - cd);

        return response;
    } else {
        return new Drank(-1, user.getDrankAll(), user.getMoney(), cooldown - cd);
    }
};