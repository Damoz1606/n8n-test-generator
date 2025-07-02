import {Queue} from "./oop-queue";

describe("Queue", () => {
    let queue: Queue<string>;

    beforeEach(() => {
        queue = new Queue<string>();
    });

    test("should be empty initially", () => {
        expect(queue.isEmpty()).toBe(true);
        expect(queue.size()).toBe(0);
    });

    test("should enqueue elements", () => {
        queue.enqueue("first");
        expect(queue.isEmpty()).toBe(false);
        expect(queue.size()).toBe(1);
        queue.enqueue("second");
        expect(queue.size()).toBe(2);
    });

    test("should dequeue elements in FIFO order", () => {
        queue.enqueue("first");
        queue.enqueue("second");
        expect(queue.dequeue()).toBe("first");
        expect(queue.dequeue()).toBe("second");
        expect(queue.isEmpty()).toBe(true);
    });

    test("should return undefined when dequeueing from an empty queue", () => {
        expect(queue.dequeue()).toBeUndefined();
    });

    test("should peek at the front element without removing it", () => {
        queue.enqueue("first");
        queue.enqueue("second");
        expect(queue.peek()).toBe("first");
        expect(queue.size()).toBe(2); // Should not remove
    });

    test("should return undefined when peeking at an empty queue", () => {
        expect(queue.peek()).toBeUndefined();
    });

    test("should correctly report size after enqueues and dequeues", () => {
        queue.enqueue("A");
        queue.enqueue("B");
        expect(queue.size()).toBe(2);
        queue.dequeue();
        expect(queue.size()).toBe(1);
        queue.enqueue("C");
        expect(queue.size()).toBe(2);
        queue.dequeue();
        queue.dequeue();
        expect(queue.size()).toBe(0);
    });

    test("should clear all elements from the queue", () => {
        queue.enqueue("X");
        queue.enqueue("Y");
        queue.clear();
        expect(queue.isEmpty()).toBe(true);
        expect(queue.size()).toBe(0);
    });
});