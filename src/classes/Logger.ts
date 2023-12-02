import { getPrisma } from "../functions/prismaClient";

export class Logger {
    private time: BigInt = BigInt(0);
    private message: string = "";

    constructor() {
    }

    public push(message: string): void {
        this.time = BigInt(Date.now());
        this.message = message;
        getPrisma().logger.create({
            data: {
                time: Number(this.time),
                message: this.message
            }
        }).then(e => {
            e.message;
        })
    }
}