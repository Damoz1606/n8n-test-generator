interface CartItem {
    productName: string;
    price: number;
    quantity: number;
}

export class ShoppingCart {
    private items: CartItem[] = [];

    public addItem(productName: string, price: number, quantity: number): void {
        if (quantity <= 0) return;

        const existingItem = this.items.find((it) => it.productName === productName);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({productName, price, quantity});
        }
    }

    public removeItem(productName: string): boolean {
        const initialLength = this.items.length;
        this.items = this.items.filter(
            (item) => item.productName !== productName,
        );
        return this.items.length < initialLength;
    }

    public getTotalPrice(): number {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    public getItems(): CartItem[] {
        return [...this.items];
    }
}