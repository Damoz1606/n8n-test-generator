import {IPaymentGateway, OrderService} from "./di-order-service";

describe("OrderService", () => {
    let mockPaymentGateway: jest.Mocked<IPaymentGateway>;
    let orderService: OrderService;

    beforeEach(() => {
        mockPaymentGateway = {
            processPayment: jest.fn(),
        };
        orderService = new OrderService(mockPaymentGateway);
    });

    test("should call processPayment on the injected gateway and return true on success", async () => {
        mockPaymentGateway.processPayment.mockResolvedValue(true); // Simulate successful payment
        const result = await orderService.placeOrder(100, "1234-xxxx-xxxx-5678");
        expect(result).toBe(true);
        expect(mockPaymentGateway.processPayment).toHaveBeenCalledTimes(1);
        expect(mockPaymentGateway.processPayment).toHaveBeenCalledWith(
            100,
            "1234-xxxx-xxxx-5678",
        );
    });

    test("should call processPayment on the injected gateway and return false on failure", async () => {
        mockPaymentGateway.processPayment.mockResolvedValue(false); // Simulate failed payment
        const result = await orderService.placeOrder(50, "failed-card");
        expect(result).toBe(false);
        expect(mockPaymentGateway.processPayment).toHaveBeenCalledTimes(1);
        expect(mockPaymentGateway.processPayment).toHaveBeenCalledWith(
            50,
            "failed-card",
        );
    });
});