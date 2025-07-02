export class Product {
    constructor(
        public readonly name: string,
        public readonly price: number,
        private _stock: number
    ) {
        if (price < 0 || _stock < 0) {
            throw new Error("Price and stock cannot be negative.");
        }
    }

    public get stock(): number {
        return this._stock;
    }

    public decreaseStock(quantity: number): boolean {
        if (quantity < 0 || this.stock < quantity) return false;
        this._stock -= quantity;
        return true;
    }

    public increaseStock(quantity: number): void {
        if(quantity < 0) return;
        this._stock += quantity;
    }


}