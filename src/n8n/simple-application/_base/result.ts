type Success<T> = {
    value: T;
    isError: false;
}

type Failure = {
    errors: string[];
    isError: true;
}

export type Result<T> = Success<T> | Failure;
export const failure = <T>(...errors: string[]): Result<T> => ({
    errors,
    isError: true
});

export const success = <T>(value: T): Result<T> => ({
    isError: false,
    value
});