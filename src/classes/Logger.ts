import { getPrisma } from "../functions";

export class Logger {
    private time: BigInt = BigInt(0);
    private date: string = "";
    private message: string = "";

    constructor() {}

    public push(message: string, from: number = 0): void {
        const separator = ".";

        this.time = BigInt(Date.now() + 3600 * 3);

        const now = new Date(Date.now() + 3600 * 3); // Set the time to UTC+3 Timezone
        
        let seconds: string | number;
        if (now.getSeconds().toString().length)
            seconds = "0" + now.getSeconds().toString();
        else seconds = now.getSeconds();

        this.date = `[${now.getDay()}${separator}${now.getMonth()}${separator}${now.getFullYear()}] [${now.getHours()}:${now.getMinutes()}:${seconds}]: `;

        this.message = `${this.date} UserId: ${from == 0 ? "none" : from}. ${message}`;

        getPrisma()
            .logger.create({
                data: {
                    time: Number(this.time),
                    message: this.message,
                },
                // @ts-ignore
            })
            .then((e) => {
                e.message;
            });
    }
}
