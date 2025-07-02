export class Queue<T> {
    private elements: T[] = [];

    public enqueue(element: T): void {
        this.elements.push(element);
    }

    public dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements.shift();
    }

    public peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements[0];
    }

    public isEmpty(): boolean {
        return this.elements.length === 0;
    }

    public size(): number {
        return this.elements.length;
    }

    public clear(): void {
        this.elements = [];
    }
}