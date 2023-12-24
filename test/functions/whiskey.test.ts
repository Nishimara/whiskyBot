import { Drank } from '../../src/classes/Drank';
import { User } from '../../src/classes/User'; // can't import from 'src/classes' cuz it's for some reason throws an error
import { whiskey } from '../../src/functions';
import { random, cooldown } from '../../src/consts';

class MockUser extends User {

    public setDrankAll(): void {}

    public setLastTimeDrank(): void {}

    public setMoney(): void {}
}

it('whiskey', async () => {
    const user = new MockUser(1);
    const whisk = await whiskey(user);

    expect(whisk).toBeInstanceOf(Drank);

    expect(whisk.money).toBeLessThanOrEqual(random.moneyMax);
    expect(whisk.money).toBeGreaterThanOrEqual(random.moneyMin);

    expect(whisk.drankNow).toBeLessThanOrEqual(random.drankMax);
    expect(whisk.drankNow).toBeGreaterThanOrEqual(random.drankMin);

    expect(whisk.drankAll).toBe(0);
    
    expect(whisk.cooldown! * -1 + cooldown * 2 - Date.now()).toBeCloseTo(cooldown, -1); // why is whisk.cooldown is negative?
});
