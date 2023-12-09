export class Drank {
    public now: number;

    public every: number;

    public cooldown?: number;

    constructor(now: number, every: number, cooldown?: number) {
        this.now = now;
        this.every = every;
        if (cooldown) {
            this.cooldown = cooldown;
        }
    }
}
