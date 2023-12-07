import { readFileSync } from 'fs';

interface iConfig {
    token: string;
}
interface iRandom {
    min: number;
    max: number;
}

export const config: iConfig = JSON.parse(readFileSync('config.json', 'utf-8'));

// Project settings
export const cooldown: number = 60 * 60 * 1000; // in miliseconds
export const ignoreErrorCodes: number[] = [
    400 // not enough rights to send messages into group
];
export const random: iRandom = {
    'min': 0.3,
    'max': 5
};