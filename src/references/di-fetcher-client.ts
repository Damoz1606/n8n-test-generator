export interface IConfigProvider {
    get(key: string): string | undefined;

    getNumber(key: string): number | undefined;
}

export class FetcherClient {
    private readonly apiUrl: string;
    private readonly timeoutMs: number;

    constructor(configProvider: IConfigProvider) {
        const url = configProvider.get("API_URL");
        const timeout = configProvider.getNumber("TIMEOUT_MS");

        if (!url) {
            throw new Error("API_URL not configured.");
        }
        if (timeout === undefined) {
            throw new Error("TIMEOUT_MS not configured.");
        }

        this.apiUrl = url;
        this.timeoutMs = timeout;
    }

    async fetchData(endpoint: string): Promise<any> {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve({
                    message: `Data from ${endpoint}`,
                    timestamp: new Date().toISOString(),
                });
            }, 10),
        );
    }

    getApiUrl(): string {
        return this.apiUrl;
    }

    getTimeout(): number {
        return this.timeoutMs;
    }
}