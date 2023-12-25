import { Context } from 'telegraf';
import { Update, Message } from '@telegraf/types';
import { User } from '../classes';
import { logger, gambaRules } from '../consts';

export const gamba = async (
    ctx: Context<Update.MessageUpdate<Message.TextMessage>>
): Promise<void | object> => {
    if (ctx.chat.type == 'private') return;
    const num = ctx.message.text.match(/(?<=\s)\d+/);

    const user = new User(ctx.message.from.id);

    await user.init();

    if (num == null)
        return ctx.reply('Введите количество вискоинов! Пример: /gamba 10');
    if (Number(num[0]) < gambaRules.gambaMin)
        return ctx.reply(
            `Ваша ставка должна быть больше ${gambaRules.gambaMin} вискоинов!`
        );
    if (user.getMoney() < Number(num[0]))
        return ctx.reply('У вас недостаточно вискоинов!');

    const dice = await ctx.sendDice({
        emoji: '🎰'
    });

    setTimeout(async () => {
        let isWin: number = 0;

        [1, 22, 43, 64].forEach((e) => {
            if (e == dice.dice.value) return (isWin = 1);

            return;
        });
        let message: string;
        let withHTML: number = 0;

        if (!isWin) {
            // until stack for individual user is not implemented yet
            // we do this instead
            await user.init();

            user.setMoney(Number(num[0]) * -1);
            if (ctx.message.from.username)
                message = '@' + ctx.message.from.username;
            else {
                message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
                withHTML = 1;
            }

            logger.push(
                `Player just lost in casino ${num[0]} coins`,
                ctx.message.from.id
            );

            if (withHTML)
                return ctx.replyWithHTML(
                    message +
                        ` Ты проиграл ${
                            num[0]
                        } вискоинов :(\nТвой счет: ${user.getMoney()} вискоинов`
                );

            return ctx.reply(
                message +
                    ` Ты проиграл ${
                        num[0]
                    } вискоинов :(\nТвой счет: ${user.getMoney()} вискоинов`
            );
        }

        await user.init();
        user.setMoney(Number(num[0]) * gambaRules.gambaCoef);

        if (ctx.message.from.username)
            message = '@' + ctx.message.from.username;
        else {
            message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
            withHTML = 1;
        }

        logger.push(
            `Player just won in casino ${
                Number(num[0]) * gambaRules.gambaCoef
            } coins`,
            ctx.message.from.id
        );

        if (withHTML)
            return ctx.replyWithHTML(
                message +
                    ` Ты выйграл ${
                        Number(num[0]) * gambaRules.gambaCoef
                    } вискоинов!\nТвой счет: ${user.getMoney()} вискоинов`
            );

        return ctx.reply(
            message +
                ` Ты выйграл ${
                    Number(num[0]) * gambaRules.gambaCoef
                } вискоинов!\nТвой счет: ${user.getMoney()} вискоинов`
        );
    }, 1000 * 2);
};
