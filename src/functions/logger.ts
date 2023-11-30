import { appendFileSync, existsSync, statSync, writeFileSync } from "fs";
import { logFile } from "../consts";

export const logger = (message: string, from: string = 'none'): void => {
    // It's temporary that logging perfoms into file
    // In future logs will be in database.

    const separator = '.';

    const now = new Date(Date.now() + 3600 * 3); // Set the time to UTC+3 Timezone

    let seconds: string | number;
    if (now.getSeconds().toString().length) seconds = '0' + now.getSeconds().toString();
    else seconds = now.getSeconds();

    const date = `[${now.getDay()}${separator}${now.getMonth()}${separator}${now.getFullYear()}] [${now.getHours()}:${now.getMinutes()}:${seconds}]`;

    if (!existsSync(logFile)) writeFileSync(logFile, '');
    const stat = statSync(logFile);
    if (!stat.size) message = `${date} ${from}: ${message}`;
    else message = `\n[${date}] ${from}: ${message}`;

    return appendFileSync(logFile, message); // TODO: limit file size
};