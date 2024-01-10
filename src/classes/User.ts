import { prisma, logger } from '../consts';

export class User {
    private id: number;

    private drankAll: number;

    private lastTimeDrank: BigInt;

    private money: BigInt;

    public getId(): number {
        return this.id;
    }

    public getDrankAll(): number {
        return this.drankAll;
    }

    public getLastTimeDrank(): BigInt {
        return this.lastTimeDrank;
    }

    public getMoney(): number {
        return Number(this.money);
    }

    public async setDrankAll(amount: number) {
        this.drankAll += amount;
        await prisma.users
            .upsert({
                create: {
                    id: this.id
                },
                update: {
                    amount: this.drankAll
                },
                where: {
                    id: this.id
                }
            })
            .then(() => {
                logger.push(
                    `Set new amount. Value: ${amount}, new amount: ${this.drankAll}`,
                    this.id
                );
                this.setLastTimeDrank(BigInt(Date.now()));
            });
    }

    public async setLastTimeDrank(lastTimeDrank: BigInt) {
        this.lastTimeDrank = lastTimeDrank;
        await prisma.users
            .upsert({
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
                logger.push(
                    `Updated lastTimeDrank. New lastTimeDrank: ${this.lastTimeDrank}`,
                    this.id
                );
            });
    }

    public async setMoney(money: number) {
        this.money = BigInt(Number(this.money) + money);
        await prisma.users
            .upsert({
                create: {
                    id: this.id
                },
                update: {
                    money: Number(this.money)
                },
                where: {
                    id: this.id
                }
            })
            .then(() => {
                logger.push(`Updated money. New money: ${this.money}`, this.id);
            });
    }

    public async init() {
        const data = await prisma.users.findUnique({
            where: {
                id: this.id
            }
        });

        if (data) {
            this.drankAll = data.amount;
            this.lastTimeDrank = data.lastTimeDrank;
            this.money = BigInt(data.money);
            logger.push('Cast data from db to User class.', this.id);
        } else {
            await prisma.users.create({
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
        this.drankAll = 0;
        this.lastTimeDrank = BigInt(0);
        this.money = BigInt(0);
    }
}
