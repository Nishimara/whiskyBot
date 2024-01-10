import { PrismaClient } from '@prisma/client';
import { Logger } from './classes/Logger';

interface Random {
    drankMin: number;
    drankMax: number;
    moneyMin: number;
    moneyMax: number;
}
interface Gamba {
    gambaMin: number;
    gambaCoef: number;
}

export const prisma = new PrismaClient();
export const logger = new Logger();

// Project settings
export const cooldown: number = 60 * 60 * 1000; // in miliseconds
export const ignoreErrorCodes: number[] = [
    400, // not enough rights to send messages into group
    429 // too many requests
];
export const random: Random = {
    drankMin: 0.3,
    drankMax: 5,
    moneyMin: 5,
    moneyMax: 15
};

export const gambaRules: Gamba = {
    gambaMin: 10,
    gambaCoef: 50
};
