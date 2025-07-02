import {FetcherClient, IConfigProvider} from "./di-fetcher-client";

describe("FetcherClient with IConfigProvider", () => {
    let mockConfigProvider: jest.Mocked<IConfigProvider>;
    let fetchClient: FetcherClient;

    beforeEach(() => {
        mockConfigProvider = {
            get: jest.fn(),
            getNumber: jest.fn(),
        };
    });

    test("should initialize successfully with valid config", () => {
        mockConfigProvider.get.mockReturnValue("http://mock.api/v2");
        mockConfigProvider.getNumber.mockReturnValue(3000);
        fetchClient = new FetcherClient(mockConfigProvider);

        expect(fetchClient.getApiUrl()).toBe("http://mock.api/v2");
        expect(fetchClient.getTimeout()).toBe(3000);
    });

    test("should throw error if API_URL is not configured", () => {
        mockConfigProvider.get.mockReturnValue(undefined); // API_URL missing
        mockConfigProvider.getNumber.mockReturnValue(3000);
        expect(() => new FetcherClient(mockConfigProvider)).toThrow(
            "API_URL not configured.",
        );
    });

    test("should throw error if TIMEOUT_MS is not configured", () => {
        mockConfigProvider.get.mockReturnValue("http://mock.api/v2");
        mockConfigProvider.getNumber.mockReturnValue(undefined); // TIMEOUT_MS missing
        expect(() => new FetcherClient(mockConfigProvider)).toThrow(
            "TIMEOUT_MS not configured.",
        );
    });

    test("should fetch data and return a successful response", async () => {
        mockConfigProvider.get.mockReturnValue("http://mock.api/v2");
        mockConfigProvider.getNumber.mockReturnValue(3000);
        fetchClient = new FetcherClient(mockConfigProvider);

        const data = await fetchClient.fetchData("/users");
        expect(data).toHaveProperty("message");
        expect(data.message).toContain("Data from /users");
        expect(data).toHaveProperty("timestamp");
    });
});