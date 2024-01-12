import { Context } from 'telegraf';
import { Update } from '@telegraf/types';
import { ignoreErrorCodes, logger } from '../consts';

interface iErr {
    UserId?: number;
    message?: string;
}

export const handler = (err: unknown, ctx: Context<Update>): void => {
    const error: iErr = err!;
    const regex: number = Number(error.message?.match(/[^Error: ]\S\d+(?=: )/));
    let ignored;

    ignoreErrorCodes.forEach((elem) => {
        if (elem === regex) return (ignored = 1);

        return;
    });

    if (ignored) return;

    logger.push(String(err), ctx.from?.id, { type: 'error' });
};
