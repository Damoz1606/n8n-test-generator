import {Product} from "./oop-product";

describe("Product", () => {
    test("should create a product with valid initial values", () => {
        const product = new Product("Laptop", 1200, 10);
        expect(product.name).toBe("Laptop");
        expect(product.price).toBe(1200);
        expect(product.stock).toBe(10);
    });

    test("should throw error if price is negative during construction", () => {
        expect(() => new Product("Phone", -100, 5)).toThrow(
            "Price and stock cannot be negative.",
        );
    });

    test("should throw error if stock is negative during construction", () => {
        expect(() => new Product("Tablet", 300, -2)).toThrow(
            "Price and stock cannot be negative.",
        );
    });

    test("should decrease stock successfully", () => {
        const product = new Product("Keyboard", 50, 20);
        const success = product.decreaseStock(5);
        expect(success).toBe(true);
        expect(product.stock).toBe(15);
    });

    test("should not decrease stock if quantity is negative", () => {
        const product = new Product("Mouse", 20, 10);
        const success = product.decreaseStock(-3);
        expect(success).toBe(false);
        expect(product.stock).toBe(10); // Stock should remain unchanged
    });

    test("should not decrease stock if quantity exceeds current stock", () => {
        const product = new Product("Monitor", 300, 5);
        const success = product.decreaseStock(10);
        expect(success).toBe(false);
        expect(product.stock).toBe(5); // Stock should remain unchanged
    });

    test("should increase stock successfully", () => {
        const product = new Product("Webcam", 70, 5);
        product.increaseStock(3);
        expect(product.stock).toBe(8);
    });

    test("should not increase stock if quantity is negative or zero", () => {
        const product = new Product("Headphones", 100, 10);
        product.increaseStock(-2);
        expect(product.stock).toBe(10);
        product.increaseStock(0);
        expect(product.stock).toBe(10);
    });
});