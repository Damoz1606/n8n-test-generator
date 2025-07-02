import {ILogger, SimpleService} from "./di-simple-service";

describe("SimpleService", () => {
    let mockLogger: jest.Mocked<ILogger>;
    let myService: SimpleService;

    beforeEach(() => {
        mockLogger = {
            log: jest.fn(),
            error: jest.fn(),
        };
        myService = new SimpleService(mockLogger);
    });

    test("should call logger.log when operation is performed successfully", () => {
        myService.performOperation("valid data");
        expect(mockLogger.log).toHaveBeenCalledTimes(1);
        expect(mockLogger.log).toHaveBeenCalledWith(
            "Performing operation with data: valid data",
        );
        expect(mockLogger.error).not.toHaveBeenCalled();
    });

    test("should call logger.error when data is empty", () => {
        myService.performOperation("");
        expect(mockLogger.error).toHaveBeenCalledTimes(1);
        expect(mockLogger.error).toHaveBeenCalledWith("Data is empty for operation.");
        expect(mockLogger.log).not.toHaveBeenCalled();
    });

    test("should return true for successful operation", () => {
        expect(myService.performOperation("some data")).toBe(true);
    });

    test("should return false for empty data operation", () => {
        expect(myService.performOperation("")).toBe(false);
    });
});