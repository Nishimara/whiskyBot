import { getPrisma } from '../functions';

export class Logger {
    private time: BigInt = BigInt(0);

    private date: string = '';

    private message: string = '';

    constructor() {}

    public push(message: string, from: number = 0): void {
        const separator = '.';

        const tz = Date.now() + 3600 * 3; // Set the time to UTC+3 Timezone

        this.time = BigInt(tz);

        const now = new Date(tz);

        const format = new Map<string, number | string>();

        format.set('seconds', now.getSeconds());
        format.set('minutes', now.getMinutes());
        format.set('hours', now.getHours());

        if (now.getSeconds().toString().length < 2)
            format.set('seconds', '0' + format.get('seconds'));

        if (now.getMinutes().toString().length < 2)
            format.set('minutes', '0' + format.get('minutes'));

        if (now.getHours().toString().length < 2)
            format.set('hours', '0' + format.get('hours'));

        this.date =
            `[${now.getDay()}${separator}${now.getMonth()}${separator}${now.getFullYear()}] ` +
            // prettier-ignore
            `[${format.get('hours')}:${format.get('minutes')}:${format.get('seconds')}]: `;

        this.message = `${this.date} UserId: ${
            from == 0 ? 'none' : from
        }. ${message}`;

        getPrisma()
            .logger.create({
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
