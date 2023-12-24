import { User } from '../../src/classes';

class MockUser extends User {
    public setDrankAll(): void {}

    public setLastTimeDrank(): void {}

    public setMoney(): void {}
}

it('User', () => {
    const user = new MockUser(1);

    expect(user.getId()).toBe(1);
    expect(user.getDrankAll()).toBe(0);
    expect(user.getMoney()).toBe(0);
    expect(user.getLastTimeDrank()).toBe(BigInt(0));
});
