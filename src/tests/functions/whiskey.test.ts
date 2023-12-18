import { Drank } from '../../classes/Drank';
import { User } from '../../classes/User';
import { whiskey } from '../../functions/whiskey';
import { random, cooldown } from '../../consts';

class MockUser extends User {
    public setDrankAll(): void {}

    public setLastTimeDrank(): void {}

    public setMoney(): void {}
}

it('whiskey', async () => {
    const whisk = await whiskey(new MockUser(1));

    expect(whisk).toBeInstanceOf(Drank);

    expect(whisk.money).toBeLessThanOrEqual(random.moneyMax);
    expect(whisk.money).toBeGreaterThanOrEqual(random.moneyMin);

    expect(whisk.drankNow).toBeLessThanOrEqual(random.drankMax);
    expect(whisk.drankNow).toBeGreaterThanOrEqual(random.drankMin);

    expect(whisk.drankAll).toBe(0);

    expect(whisk.cooldown! - Date.now()).toBeLessThanOrEqual(cooldown); // rewrite cuz whisk.cooldown is negative (?)
});
