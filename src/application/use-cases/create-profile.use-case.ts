import { CreateProfileCommand } from '../commands/create-profile.command';
import {UseCase} from "../../_base/use-case";

export type CreateProfileUseCase = UseCase<CreateProfileCommand>;
