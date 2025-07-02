import {Counter} from "./oop-counter";

describe("Counter", () => {
    test("should initialize with a default count of 0", () => {
        const counter = new Counter();
        expect(counter.count).toBe(0);
    });

    test("should initialize with a specified initial count", () => {
        const counter = new Counter(10);
        expect(counter.count).toBe(10);
    });

    test("should increment the count by 1", () => {
        const counter = new Counter();
        counter.increment();
        expect(counter.count).toBe(1);
    });

    test("should decrement the count by 1", () => {
        const counter = new Counter(5);
        counter.decrement();
        expect(counter.count).toBe(4);
    });

    test("should reset the count to 0", () => {
        const counter = new Counter(100);
        counter.reset();
        expect(counter.count).toBe(0);
    });

    test("should handle multiple increments and decrements", () => {
        const counter = new Counter(5);
        counter.increment(); // 6
        counter.increment(); // 7
        counter.decrement(); // 6
        expect(counter.count).toBe(6);
    });
});