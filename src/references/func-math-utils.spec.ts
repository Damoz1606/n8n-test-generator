import {factorial, filterEvenNumbers, sumArray} from "./func-math-utils";

describe("Math utils", () => {
    // Test for sumArray
    describe("sumArray", () => {
        test("should correctly sum an array of positive numbers", () => {
            expect(sumArray([1, 2, 3, 4, 5])).toBe(15);
        });

        test("should correctly sum an array with negative numbers", () => {
            expect(sumArray([-1, 0, 1])).toBe(0);
        });

        test("should return 0 for an empty array", () => {
            expect(sumArray([])).toBe(0);
        });

        test("should correctly sum an array with a single number", () => {
            expect(sumArray([7])).toBe(7);
        });

        test("should handle floating-point numbers", () => {
            expect(sumArray([0.1, 0.2, 0.3])).toBeCloseTo(0.6); // Use toBeCloseTo for floats
        });
    });

    describe("filterEvenNumbers", () => {
        test("should filter out odd numbers and return only evens", () => {
            expect(filterEvenNumbers([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
        });

        test("should return an empty array if no even numbers are present", () => {
            expect(filterEvenNumbers([1, 3, 5, 7])).toEqual([]);
        });

        test("should return an empty array for an empty input array", () => {
            expect(filterEvenNumbers([])).toEqual([]);
        });

        test("should handle an array with only even numbers", () => {
            expect(filterEvenNumbers([2, 4, 6, 8])).toEqual([2, 4, 6, 8]);
        });

        test("should handle negative even numbers", () => {
            expect(filterEvenNumbers([-2, -1, 0, 1, 2])).toEqual([-2, 0, 2]);
        });
    });

    describe("factorial", () => {
        test("should return 1 for 0!", () => {
            expect(factorial(0)).toBe(1);
        });

        test("should return 1 for 1!", () => {
            expect(factorial(1)).toBe(1);
        });

        test("should calculate factorial for a positive number (5!)", () => {
            expect(factorial(5)).toBe(120); // 5 * 4 * 3 * 2 * 1
        });

        test("should calculate factorial for a small positive number (3!)", () => {
            expect(factorial(3)).toBe(6); // 3 * 2 * 1
        });

        test("should throw an error for a negative number", () => {
            expect(() => factorial(-1)).toThrow(
                "Factorial is not defined for negative numbers.",
            );
        });
    });
});