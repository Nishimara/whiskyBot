import { User } from '../../src/classes/User';

it('User', () => {
    const user = new User(1);

    expect(user.getId()).toBe(1);
    expect(user.getDrankAll()).toBe(0);
    expect(user.getMoney()).toBe(0);
    expect(user.getLastTimeDrank()).toBe(BigInt(0));
});
