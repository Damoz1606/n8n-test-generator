import {CreateCredentialUseCase} from "../use-cases/create-credential.use-case";
import {createCredentials, Credential} from "../../domain/credential.domain";
import {failure, Result, success} from "../../_base/result";
import {CredentialRepository} from "../interfaces/credential-repository";
import {CreateCredentialCommand} from "../commands/create-credential.command";

export class CreateCredentialService implements CreateCredentialUseCase {
    constructor(private readonly repository: CredentialRepository) {
    }

    async execute(payload: CreateCredentialCommand): Promise<Result<string>> {
        const optional = await this.repository.findOne(payload.username);
        if (!optional.isEmpty) return failure("Credential already exists");

        const credential = createCredentials(payload.username, payload.password);

        await this.repository.save(credential);

        return success(credential.id);
    }
}