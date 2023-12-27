export class Drank {
    public drankNow: number;

    public drankAll: number;

    public drankInThisChat: number;

    public cooldown?: number;

    public money: number;

    constructor(
        drankNow: number,
        drankAll: number,
        money: number,
        cooldown: number,
        drankInThisChat: number
    ) {
        this.drankNow = drankNow;
        this.drankAll = drankAll;
        this.money = money;
        this.cooldown = cooldown;
        this.drankInThisChat = drankInThisChat;
    }
}
