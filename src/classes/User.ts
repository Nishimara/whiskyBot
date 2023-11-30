class User {
    private id: number;
    private amount: number;
    private lastTimeDrank: number;
    constructor(id: number, amount: number, lastTimeDrank: number) {
        this.amount = amount;
        this.id = id;
        this.lastTimeDrank = lastTimeDrank;
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
    }

    public setLastTimeDrank(lastTimeDrank: number) {
        this.lastTimeDrank = lastTimeDrank;
    }
}
