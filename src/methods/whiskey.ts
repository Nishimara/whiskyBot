import { Drank } from "../classes/Drank";
import { User } from "../classes/User";

export const whiskey = (user: User): Drank => {
    let now: number = parseFloat((Math.random() * 5 + 0.3).toFixed(1));
    user.setAmount(now);
    let response = new Drank(now, user.getAmount());
    return response;
};
