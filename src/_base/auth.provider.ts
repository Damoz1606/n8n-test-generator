import {Option} from "./option";
import {Result} from "./result";

export type CredentialsPayload = {
  username: string;
  password: string;
  email: string;
};

export interface AuthProvider {
  create(payload: CredentialsPayload): Promise<Option<string>>;
  validate(token: string): Promise<Result<string>>;
}
