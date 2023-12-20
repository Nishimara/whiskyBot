import { Logger } from './classes';

interface iConfig {
    token: string;
}
interface iRandom {
    drankMin: number;
    drankMax: number;
    moneyMin: number;
    moneyMax: number;
}

// eslint-disable-next-line no-undef
export const config: iConfig = await Bun.file('config.json').json();
export const logger: Logger = new Logger();

// Project settings
export const cooldown: number = 60 * 60 * 1000; // in miliseconds
export const ignoreErrorCodes: number[] = [
    400 // not enough rights to send messages into group
];
export const random: iRandom = {
    drankMin: 0.3,
    drankMax: 5,
    moneyMin: 5,
    moneyMax: 15
};
