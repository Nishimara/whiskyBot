import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // cannot import that shit from consts due to Circular dependency

interface MessageType {
    type: 'default' | 'error';
}

export class Logger {
    private time: BigInt = BigInt(0);

    private date: string = '';

    private message: string = '';

    constructor() {}

    public push(
        message: string,
        from?: number,
        type?: MessageType
    ): Promise<void> {
        const separator = '.';

        const tz = Date.now() + 3600 * 3; // Set the time to UTC+3 Timezone

        this.time = BigInt(tz);

        const now = new Date(tz);

        const format = new Map<string, string>();

        format
            .set('seconds', now.getSeconds().toString().padStart(2, '0'))
            .set('minutes', now.getMinutes().toString().padStart(2, '0'))
            .set('hours', now.getHours().toString().padStart(2, '0'))
            .set('day', now.getDate().toString().padStart(2, '0'))
            .set('month', (now.getMonth() + 1).toString().padStart(2, '0'));

        this.date =
            // prettier-ignore
            `[${format.get('day')}${separator}${format.get('month')}${separator}${now.getFullYear()}] ` +
            // prettier-ignore
            `[${format.get('hours')}:${format.get('minutes')}:${format.get('seconds')}]: `;

        if (!type || type.type == 'default') {
            this.message = `${this.date} UserId: ${
                from ? from : 'none'
            }. ${message}`;

            return prisma.logger
                .create({
                    data: {
                        time: Number(this.time),
                        message: this.message
                    }
                })
                .then((e) => {
                    e.message;
                });
        }

        // if something will be added in MessageType interface
        // then code below needs some checks for actual type
        this.message = `${this.date} Unhandled Error: ${message}`;

        return prisma.logger
            .create({
                data: {
                    time: Number(this.time),
                    message: this.message
                }
            })
            .then((e) => {
                e.message;
            });
    }
}
