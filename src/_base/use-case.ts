import {Result} from "./result";

export interface UseCase<T, R = string> {
  execute(payload: T): Promise<Result<R>>;
}
