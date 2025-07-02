export interface IPaymentGateway {
    processPayment(amount: number, paymentDetail: string): Promise<boolean>;
}

export class OrderService {
    constructor(private readonly paymentGateway: IPaymentGateway) {
    }

    async placeOrder(amount: number, paymentDetails: string): Promise<boolean> {
        return await this.paymentGateway.processPayment(
            amount,
            paymentDetails,
        );
    }
}