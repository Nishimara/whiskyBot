import { Drank } from '../../src/classes/Drank';

it('Drank', () => {
    const drank = new Drank(0, 1, 2, 3);

    expect(drank.drankNow).toBe(0);
    expect(drank.drankAll).toBe(1);
    expect(drank.money).toBe(2);
    expect(drank.cooldown).toBe(3);
});

it('Bad nums', () => {
    const drank = new Drank(-1, -2, -3, -4);

    expect(drank.drankNow).toBe(-1);
    expect(drank.drankAll).toBe(-2);
    expect(drank.money).toBe(-3);
    expect(drank.cooldown).toBe(-4);
});
