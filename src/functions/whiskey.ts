import { Drank, User } from '../classes';
import { cooldown } from '../consts';

export const whiskey = (user: User): Drank => {
    const cd: number = Date.now() - Number(user.getLastTimeDrank());

    if (cd > cooldown) {
        const now: number = parseFloat((Math.random() * 5 + 0.3).toFixed(1));

        user.setAmount(now);
        const response = new Drank(now, user.getAmount());

        return response;
    } else {
        return new Drank(-1, 0, cooldown - cd);
    }
};