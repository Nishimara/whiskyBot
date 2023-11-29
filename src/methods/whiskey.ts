import { Drank } from "../classes/Drank";

export const whiskey = (id: Number = 0): Drank => {
  let now: number = parseFloat((Math.random() * 5 + 0.3).toFixed(1));
  let every: number = 999;
  let response = new Drank(now, every);
  return response;
};
