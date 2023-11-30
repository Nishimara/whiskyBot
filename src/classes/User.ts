import { getPrisma } from "../functions/prismaClient";

export class User {
    private id: number;
    private amount: number;
    private lastTimeDrank: number;
    constructor(id: number) {
        this.id = id;
        this.amount = 0;
        this.lastTimeDrank = 0;
        
        const prisma = getPrisma();
        prisma.users.findUnique({
            where: {
                id: id
            }
        }).then(resp => {
            if(resp){
                this.amount = resp.amount;
                this.lastTimeDrank = resp.lastTimeDrank;
            } else {
                prisma.users.create({
                    data: {
                        id: this.id,
                        amount: this.amount,
                        lastTimeDrank: this.lastTimeDrank
                    }
                })
            }
        })
        
    }

    public getId(): number {
        return this.id;
    }

    public getAmount(): number {
        return this.amount;
    }

    public getLastTimeDrank(): number {
        return this.lastTimeDrank;
    }

    public setAmount(amount: number) {
        this.amount += amount;
        getPrisma().users.update({
            data: {
                amount: this.amount
            },
            where: {
                id: this.id
            }
        })

    }

    public setLastTimeDrank(lastTimeDrank: number) {
        this.lastTimeDrank = lastTimeDrank;
        getPrisma().users.update({
            data: {
                lastTimeDrank: this.lastTimeDrank
            },
            where: {
                id: this.id
            }
        })
    }
}
