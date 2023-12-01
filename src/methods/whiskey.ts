import { Drank } from "../classes/Drank";
import { User } from "../classes/User";
import { cooldown } from "../consts";

export const whiskey = (user: User): Drank => {
    let cd: number = Date.now() - Number(user.getLastTimeDrank());
    if (cd > cooldown){
        let now: number = parseFloat((Math.random() * 5 + 0.3).toFixed(1));
        user.setAmount(now);
        let response = new Drank(now, user.getAmount());
        return response;
    } else {
        return new Drank(-1, 0, cooldown-cd);
    }
};
