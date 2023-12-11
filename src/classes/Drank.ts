export class Drank {
    public drankNow: number;

    public drankAll: number;

    public cooldown?: number;

    public money: number;

    constructor(
        drankNow: number,
        drankAll: number,
        money: number,
        cooldown: number
    ) {
        this.drankNow = drankNow;
        this.drankAll = drankAll;
        this.money = money;
        this.cooldown = cooldown;
    }
}
