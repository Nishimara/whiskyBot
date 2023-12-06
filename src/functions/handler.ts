import { Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { ignoreErrorCodes } from '../consts';
import { Logger } from '../classes';

const logger = new Logger();

export const handler = (err: unknown, ctx: Context<Update>): void => {
    interface iErr {
        UserId?: number;
        message?: string;
    } // there has to be a better solution? rewrite

    const error: iErr = err!;
    const regex: number = Number(error.message?.match(/[^Error: ]\S\d+(?=: )/)); // this regex can be better
    let isErr;

    ignoreErrorCodes.forEach((elem) => {
        if (elem === regex) isErr = true;
    });

    if (isErr) return;

    logger.push(String(err), ctx.from?.id); // possibly some highlighting to easily see errors in db?
};