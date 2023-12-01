import { getPrisma } from "../functions";

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
                        id: this.id,
                    },
                    update: {
                        amount: this.amount,
                    },
                    where: {
                        id: this.id,
                    },
                })
                .then(() => {
                    this.setLastTimeDrank(BigInt(Date.now()));
                });
    }

    public setLastTimeDrank(lastTimeDrank: BigInt) {
        this.lastTimeDrank = lastTimeDrank;
        getPrisma()
            .users.upsert({
                create: {
                    id: this.id,
                },
                update: {
                    lastTimeDrank: BigInt(lastTimeDrank.toString()),
                },
                where: {
                    id: this.id,
                },
            })
            .then((e: any) => { // just to clarify: using 'any' type is bad and we should make interface for this thing
                e.amount;
            });
    }

    public async init() {
        const data = await getPrisma().users.findUnique({
            where: {
                id: this.id,
            },
        });
        if (data) {
            this.amount = data.amount;
            this.lastTimeDrank = data.lastTimeDrank;
        } else {
            const res = await getPrisma().users.create({
                data: {
                    id: this.id,
                },
            });
        }
    }

    constructor(id: number) {
        this.id = id;
        this.amount = 0;
        this.lastTimeDrank = BigInt(0);
    }
}
