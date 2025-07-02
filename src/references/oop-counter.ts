export class Counter {
    constructor(private _count: number = 0) {
    }

    public get count(): number {
        return this._count;
    }

    increment() {
        this._count++;
    }

    decrement() {
        this._count--;
    }

    reset() {
        this._count = 0;
    }
}