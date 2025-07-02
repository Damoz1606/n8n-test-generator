import {ShoppingCart} from "./oop-shopping-cart";

describe("ShoppingCart", () => {
    let cart: ShoppingCart;

    beforeEach(() => {
        cart = new ShoppingCart();
    });

    test("should add a new item to the cart", () => {
        cart.addItem("Milk", 2.5, 1);
        const items = cart.getItems();
        expect(items.length).toBe(1);
        expect(items[0]).toEqual({productName: "Milk", price: 2.5, quantity: 1});
    });

    test("should update quantity if item already exists", () => {
        cart.addItem("Bread", 3.0, 1);
        cart.addItem("Bread", 3.0, 2);
        const items = cart.getItems();
        expect(items.length).toBe(1);
        expect(items[0].quantity).toBe(3);
        expect(items[0].price).toBe(3.0); // Price should remain the same
    });

    test("should not add item if quantity is zero or negative", () => {
        cart.addItem("Eggs", 4.0, 0);
        cart.addItem("Cheese", 5.0, -1);
        expect(cart.getItems().length).toBe(0);
    });

    test("should remove an item from the cart", () => {
        cart.addItem("Milk", 2.5, 1);
        cart.addItem("Bread", 3.0, 2);
        const removed = cart.removeItem("Milk");
        expect(removed).toBe(true);
        expect(cart.getItems().length).toBe(1);
        expect(cart.getItems()[0].productName).toBe("Bread");
    });

    test("should return false if item to remove is not found", () => {
        cart.addItem("Milk", 2.5, 1);
        const removed = cart.removeItem("NonExistentItem");
        expect(removed).toBe(false);
        expect(cart.getItems().length).toBe(1);
    });

    test("should calculate total price correctly with multiple items", () => {
        cart.addItem("Milk", 2.5, 2); // 5.0
        cart.addItem("Bread", 3.0, 1); // 3.0
        cart.addItem("Eggs", 4.0, 6); // 24.0
        expect(cart.getTotalPrice()).toBe(5.0 + 3.0 + 24.0); // 32.0
    });

    test("should return 0 for total price if cart is empty", () => {
        expect(cart.getTotalPrice()).toBe(0);
    });

    test("should return a copy of items to prevent external modification", () => {
        cart.addItem("Apple", 1.0, 5);
        const items = cart.getItems();
        items.pop(); // Modify the returned copy
        expect(cart.getItems().length).toBe(1); // Original cart should be unaffected
    });
});