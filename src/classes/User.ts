import { getPrisma } from '../functions';
import { Logger } from './Logger';

const logger: Logger = new Logger();

export class User {
    private id: number;

    private amount: number;

    private lastTimeDrank: BigInt;

    public getId(): number {
        return this.id;
    }

    public getAmount(): number {
        return this.amount;
    }

    public getLastTimeDrank(): BigInt {
        return this.lastTimeDrank;
    }

    public setAmount(amount: number) {
            this.amount += amount;
            getPrisma()
                .users.upsert({
                    create: {
                        id: this.id
                    },
                    update: {
                        amount: this.amount
                    },
                    where: {
                        id: this.id
                    }
                })
                .then(() => {
                    logger.push(`Set new amout. Value: ${amount}, new amout: ${this.amount}`, this.id);
                    this.setLastTimeDrank(BigInt(Date.now()));
                });
    }

    public setLastTimeDrank(lastTimeDrank: BigInt) {
        this.lastTimeDrank = lastTimeDrank;
        getPrisma()
            .users.upsert({
                create: {
                    id: this.id
                },
                update: {
                    lastTimeDrank: BigInt(lastTimeDrank.toString())
                },
                where: {
                    id: this.id
                }
            })
            .then((e) => {
                e.amount;
                logger.push(`Update lastTimeDrank. New lastTimeDrank: ${this.lastTimeDrank}`, this.id);
            });
    }

    public async init() {
        const data = await getPrisma().users.findUnique({
            where: {
                id: this.id
            }
        });

        if (data) {
            this.amount = data.amount;
            this.lastTimeDrank = data.lastTimeDrank;
            logger.push('Cast data from db to User class.', this.id);
        } else {
            await getPrisma().users.create({
                data: {
                    id: this.id
                }
            });
            logger.push('Create new user.', this.id);
            this.init();
        }
    }

    constructor(id: number) {
        this.id = id;
        this.amount = 0;
        this.lastTimeDrank = BigInt(0);
    }
}
