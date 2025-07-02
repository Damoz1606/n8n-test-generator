import {IEmailSender, ISmsSender, NotificationService} from "./di-notification-service";

describe("NotificationService with IEmailSender and ISmsSender", () => {
    let mockEmailSender: jest.Mocked<IEmailSender>;
    let mockSmsSender: jest.Mocked<ISmsSender>;
    let notificationService: NotificationService;

    beforeEach(() => {
        mockEmailSender = {
            sendEmail: jest.fn(),
        };
        mockSmsSender = {
            sendSms: jest.fn(),
        };
        notificationService = new NotificationService(
            mockEmailSender,
            mockSmsSender,
        );
    });

    test("should send welcome email and SMS for new user", async () => {
        mockEmailSender.sendEmail.mockResolvedValue(true);
        mockSmsSender.sendSms.mockResolvedValue(true);

        const results = await notificationService.sendWelcomeNotification(
            "test@example.com",
            "1234567890",
            "Alice",
        );

        expect(results).toEqual([true, true]);
        expect(mockEmailSender.sendEmail).toHaveBeenCalledTimes(1);
        expect(mockEmailSender.sendEmail).toHaveBeenCalledWith(
            "test@example.com",
            "Welcome to our service!",
            expect.stringContaining("Hello Alice"),
        );
        expect(mockSmsSender.sendSms).toHaveBeenCalledTimes(1);
        expect(mockSmsSender.sendSms).toHaveBeenCalledWith(
            "1234567890",
            expect.stringContaining("Welcome, Alice!"),
        );
    });

    test("should send order confirmation email", async () => {
        mockEmailSender.sendEmail.mockResolvedValue(true);

        const result = await notificationService.sendOrderConfirmation(
            "order@example.com",
            "ORDER-123",
            99.99,
        );

        expect(result).toBe(true);
        expect(mockEmailSender.sendEmail).toHaveBeenCalledTimes(1);
        expect(mockEmailSender.sendEmail).toHaveBeenCalledWith(
            "order@example.com",
            "Order #ORDER-123 Confirmed",
            "Your order for $99.99 has been confirmed.",
        );
        expect(mockSmsSender.sendSms).not.toHaveBeenCalled(); // Only email should be sent
    });
});