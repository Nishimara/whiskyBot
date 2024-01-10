import { Update, Message } from '@telegraf/types';
import { Context } from 'telegraf';
import { User, Drank, Stack } from '../classes';
import { whiskey, getChat } from '../functions';
import { logger } from '../consts';

const stack = new Stack();

export const whiskeyCommand = async (
    ctx: Context<Update.MessageUpdate<Message.TextMessage>>
): Promise<void> => {
    if (ctx.chat.type == 'private') return;
    const user = new User(ctx.message.from.id);

    await user.init();
    let message: string;
    let withHTML: number;
    let ending: string;
    let endingAll: string;

    const chat = await getChat(user.getId(), ctx.chat.id);

    stack.push(async (user) => {
        await user.init();
        await whiskey(user, ctx.chat.id).then((drank: Drank) => {
            if (drank.drankNow == -1) {
                if (!drank.cooldown) return;

                switch (Math.floor(user.getDrankAll()).toString().slice(-1)) {
                    case '0':
                        endingAll = 'ов';
                        break;
                    case '1':
                        endingAll = '';
                        break;
                    case '2':
                        endingAll = 'ов';
                        break;
                    case '3':
                        endingAll = 'а';
                        break;
                    case '4':
                        endingAll = 'а';
                        break;
                    default:
                        endingAll = 'ов';
                        break;
                }

                switch (Math.floor(chat.totalAmount).toString().slice(-1)) {
                    case '0':
                        ending = 'ов';
                        break;
                    case '1':
                        ending = '';
                        break;
                    case '2':
                        ending = 'ов';
                        break;
                    case '3':
                        ending = 'а';
                        break;
                    case '4':
                        ending = 'а';
                        break;
                    default:
                        ending = 'ов';
                        break;
                }

                if (ctx.message.from.username)
                    message = '@' + ctx.message.from.username;
                else {
                    message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
                    withHTML = 1;
                }

                message += ` ты уже пил виски недавно! Тебе нужно немного отойти.\nВсего выпито ${
                    Number((drank.drankAll % 1).toFixed(1)) == 0
                        ? drank.drankAll.toFixed(0)
                        : drank.drankAll.toFixed(1)
                } литр${endingAll}.\nВыпито в этом чате ${
                    Number((chat.totalAmount % 1).toFixed(1)) == 0
                        ? chat.totalAmount.toFixed(0)
                        : chat.totalAmount.toFixed(1)
                } литр${ending}.\nНафармлено ${
                    user.getMoney() + drank.money
                } вискоинов.\n\nПопробуй снова через ${(
                    drank.cooldown /
                    (1000 * 60)
                )
                    .toString()
                    .match(/\d+/)} м. ${((drank.cooldown / 1000) % 60)
                    .toString()
                    .match(/\d+/)} с.`;

                logger.push(
                    `Cooldown triggered with ms ${drank.cooldown}`,
                    ctx.message.from.id
                );

                if (withHTML) ctx.replyWithHTML(message);

                return ctx.reply(message);
            }

            if (ctx.message.from.username)
                message = '@' + ctx.message.from.username;
            else {
                message = `<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;
                withHTML = 1;
            }

            let endingCurrent: string;

            // total amount dranked in chat
            switch (Math.floor(chat.totalAmount).toString().slice(-1)) {
                case '0':
                    ending = 'ов';
                    break;
                case '1':
                    ending = 'ов';
                    break;
                case '2':
                    ending = 'а';
                    break;
                case '3':
                    ending = 'а';
                    break;
                case '4':
                    ending = 'а';
                    break;
                default:
                    ending = 'ов';
                    break;
            }

            // dranked now
            switch (Math.floor(drank.drankNow)) {
                case 0:
                    endingCurrent = 'ов';
                    break;
                case 1:
                    endingCurrent = '';
                    break;
                case 2:
                    endingCurrent = 'а';
                    break;
                case 3:
                    endingCurrent = 'а';
                    break;
                case 4:
                    endingCurrent = 'а';
                    break;
                default:
                    endingCurrent = 'ов';
                    break;
            }

            message += ` ты выпил ${
                drank.drankNow
            } литр${endingCurrent} виски и заработал ${
                drank.money
            } вискоинов, красава.\nВ этом чате выпито ${
                Number(((chat.totalAmount + drank.drankNow) % 1).toFixed(1)) ==
                0
                    ? (chat.totalAmount + drank.drankNow).toFixed(0)
                    : (chat.totalAmount + drank.drankNow).toFixed(1)
            } литр${ending}, нафармлено ${user.getMoney()} вискоинов`;

            logger.push(
                `Added ${drank.drankNow} liters of whisky`,
                ctx.message.from.id
            );
            logger.push(`Added ${drank.money} moneys`, ctx.message.from.id);

            if (withHTML) return ctx.replyWithHTML(message);

            return ctx.reply(message);
        });
    }, user);
};
