import { User } from '.';
import { Message } from '@telegraf/types';

// eslint-disable-next-line no-unused-vars
type task = (user: User, ...args: any) => Promise<void | Message.TextMessage>;

export class Stack {
    private items: task[];

    private running: boolean;

    constructor() {
        this.items = [];
        this.running = false;
    }

    public async push(item: task, user: User, ...args: any): Promise<void> {
        this.items.push(item);
        if (!this.running) {
            this.running = true;
            while (this.size() > 0) {
                const nextTask = this.shift();

                await nextTask!(user, args);
            }
            this.running = false;
        }
    }

    public size(): number {
        return this.items.length;
    }

    private shift(): task | undefined {
        return this.items.shift();
    }
}
