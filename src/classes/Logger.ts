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

        let seconds: string | number;

        if (now.getSeconds().toString().length < 2)
            seconds = '0' + now.getSeconds().toString();
        else seconds = now.getSeconds();

        this.date = `[${now.getDay()}${separator}${now.getMonth()}${separator}${now.getFullYear()}] [${now.getHours()}:${now.getMinutes()}:${seconds}]: `;

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
