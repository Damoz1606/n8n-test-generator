export interface IEmailSender {
    sendEmail(to: string, subject: string, body: string): Promise<boolean>;
}

export interface ISmsSender {
    sendSms(to: string, message: string): Promise<boolean>;
}

export class NotificationService {
    private emailSender: IEmailSender;
    private smsSender: ISmsSender;

    constructor(emailSender: IEmailSender, smsSender: ISmsSender) {
        this.emailSender = emailSender;
        this.smsSender = smsSender;
    }

    async sendWelcomeNotification(
        email: string,
        phoneNumber: string,
        username: string,
    ): Promise<boolean[]> {
        const emailSuccess = await this.emailSender.sendEmail(
            email,
            "Welcome to our service!",
            `Hello ${username},\n\nWelcome aboard! We're excited to have you.`,
        );
        const smsSuccess = await this.smsSender.sendSms(
            phoneNumber,
            `Welcome, ${username}! Your account is ready.`,
        );
        return [emailSuccess, smsSuccess];
    }

    async sendOrderConfirmation(
        email: string,
        orderId: string,
        totalAmount: number,
    ): Promise<boolean> {
        return this.emailSender.sendEmail(
            email,
            `Order #${orderId} Confirmed`,
            `Your order for $${totalAmount} has been confirmed.`,
        );
    }
}