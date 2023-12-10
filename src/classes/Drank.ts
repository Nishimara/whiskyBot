export class Drank {
    public now: number;

    public every: number;

    public cooldown?: number;

    public money: number;

    constructor(now: number, every: number, money: number, cooldown?: number) {
        this.now = now;
        this.every = every;
        this.money = money;
        if (cooldown) this.cooldown = cooldown;
    }
}
