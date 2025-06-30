type Success<T = unknown> = {
  data: T;
  isSuccess: true;
};

type Failure = {
  error: string[];
  isSuccess: false;
};

export type Result<T = unknown> = Success<T> | Failure;
export const isSuccess = <T = unknown>(value: Result<T>): value is Success<T> =>
  value.isSuccess;
export const isFailure = <T = unknown>(value: Result<T>): value is Failure =>
  !value.isSuccess;

export const resultHelper = {
  failure: (...error: string[]): Failure => ({
    isSuccess: false,
    error: error,
  }),
  success: <T = unknown>(value: T): Success<T> => ({
    isSuccess: true,
    data: value,
  }),
};
