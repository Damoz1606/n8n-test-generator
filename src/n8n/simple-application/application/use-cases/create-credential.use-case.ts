import {UseCase} from "../../_base/use-case";
import {Credential} from "../../domain/credential.domain";
import {CreateCredentialCommand} from "../commands/create-credential.command";

export type CreateCredentialUseCase = UseCase<CreateCredentialCommand>;