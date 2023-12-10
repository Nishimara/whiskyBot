export class Drank {
    public drankNow: number;

    public drankAll: number;

    public cooldown?: number;

    public money: number;

    constructor(now: number, every: number, money: number, cooldown: number) {
        this.drankNow = now;
        this.drankAll = every;
        this.money = money;
        this.cooldown = cooldown;
    }
}
