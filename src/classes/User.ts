import { getPrisma } from "../functions/prismaClient";

export class User {
    private id: number;
    private amount: number;
    private lastTimeDrank: number;
    
    
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
        getPrisma().users.upsert({
            create: {
                id: this.id
            },
            update: {
                amount: this.amount
            },
            where: {
                id: this.id
            }
        }).then(e=>{
            e.amount;
        });
    }

    public setLastTimeDrank(lastTimeDrank: number) {
        this.lastTimeDrank = lastTimeDrank;
        getPrisma().users.upsert({
            create: {
                id: this.id
            },
            update: {
                lastTimeDrank: lastTimeDrank
            },
            where: {
                id: this.id
            }
        }).then(e=>{
            e.amount;
        });
    }

    public async init(){
        const data = await getPrisma().users.findUnique({
            where: {
                id: this.id
            }
        })
        if(data){
            this.amount = data?.amount;
            this.lastTimeDrank = data?.lastTimeDrank;
        } else {
            const res = await getPrisma().users.create({
                data: {
                    id: this.id
                }
            })
        }
        
    }

    constructor(id: number) {
        this.id = id;
        this.amount = 0;
        this.lastTimeDrank = 0;
    }
}
