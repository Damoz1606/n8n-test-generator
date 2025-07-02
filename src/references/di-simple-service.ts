export interface ILogger {
    log(message: string): void;

    error(message: string): void;
}

export class SimpleService {
    constructor(private readonly logger: ILogger) {
    }

    public performOperation(data: string): boolean {
        if (!data) {
            this.logger.error("Data is empty for operation.");
            return false;
        }
        this.logger.log(`Performing operation with data: ${data}`);
        return true;
    }
}