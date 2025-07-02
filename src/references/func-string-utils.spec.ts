import {capitalizeFirstLetter, reverseString} from "./func-string-utils";

describe('String Utils', () => {
    describe("capitalizeFirstLetter", () => {
        test("should capitalize the first letter of a word", () => {
            expect(capitalizeFirstLetter("hello")).toBe("Hello");
        });

        test("should return an empty string for an empty input", () => {
            expect(capitalizeFirstLetter("")).toBe("");
        });

        test("should handle a single character string", () => {
            expect(capitalizeFirstLetter("a")).toBe("A");
        });

        test("should not change an already capitalized string", () => {
            expect(capitalizeFirstLetter("World")).toBe("World");
        });

        test("should handle strings with leading spaces (trimming is not part of this function's responsibility)", () => {
            expect(capitalizeFirstLetter("  hello")).toBe("  hello"); // Shows function's exact behavior
        });
    });

    describe("reverseString", () => {
        test("should reverse a simple string", () => {
            expect(reverseString("hello")).toBe("olleh");
        });

        test("should handle an empty string", () => {
            expect(reverseString("")).toBe("");
        });

        test("should handle a single character string", () => {
            expect(reverseString("a")).toBe("a");
        });

        test("should reverse a string with spaces", () => {
            expect(reverseString("hello world")).toBe("dlrow olleh");
        });

        test("should reverse a string with special characters", () => {
            expect(reverseString("!@#$")).toBe("$#@!");
        });
    });
});