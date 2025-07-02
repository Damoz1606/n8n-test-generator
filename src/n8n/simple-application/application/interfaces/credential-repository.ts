import {Credential} from "../../domain/credential.domain";
import {Optional} from "../../_base/optional";

export interface CredentialRepository {
    findOne(value: string): Promise<Optional<Credential>>;

    save(value: Credential): Promise<string>;
}