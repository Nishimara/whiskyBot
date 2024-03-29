import { Drank } from '../../src/classes/Drank';
import { it, expect } from 'bun:test';

it('Drank', () => {
    const drank = new Drank(0, 1, 2, 3, 4);

    expect(drank.drankNow).toBe(0);
    expect(drank.drankAll).toBe(1);
    expect(drank.money).toBe(2);
    expect(drank.cooldown).toBe(3);
    expect(drank.drankInThisChat).toBe(4);
});

it('Bad nums', () => {
    const drank = new Drank(-1, -2, -3, -4, -5);

    expect(drank.drankNow).toBe(-1);
    expect(drank.drankAll).toBe(-2);
    expect(drank.money).toBe(-3);
    expect(drank.cooldown).toBe(-4);
    expect(drank.drankInThisChat).toBe(-5);
});
