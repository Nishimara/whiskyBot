import { Context } from 'telegraf';
import { Update } from '@telegraf/types';
import { ignoreErrorCodes, logger } from '../consts';

interface iErr {
    UserId?: number;
    message?: string;
}

export const handler = (err: unknown, ctx: Context<Update>): void => {
    const error: iErr = err!;
    const code: number = Number(error.message?.match(/[^Error: ]\S\d+(?=: )/));
    let ignored = false;

    ignoreErrorCodes.forEach((elem) => {
        if (elem === code) return (ignored = true);

        return;
    });

    if (ignored || !error) return;

    logger.push(String(err), ctx.from?.id, { type: 'error' });
};
