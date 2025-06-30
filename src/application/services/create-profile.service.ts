import { CreateProfileUseCase } from '../use-cases/create-profile.use-case';
import { CreateProfileCommand } from '../commands/create-profile.command';
import { createProfile } from '../../domain/profile.domain';
import {AuthProvider} from "../../_base/auth.provider";
import {Result} from "../../_base/result";
import {ProfileAggregateRepository} from "../repositories/profile.repository";
import {ProfileResult} from "../../domain/profile.results";

export class CreateProfileService implements CreateProfileUseCase {
  constructor(
    private readonly auth: AuthProvider,
    private readonly repository: ProfileAggregateRepository,
  ) {}

  async execute(payload: CreateProfileCommand): Promise<Result<string>> {
    const auth = await this.auth.create(payload);
    if (auth.isEmpty) return ProfileResult.failure.auth.unavailable;

    const profile = createProfile({ ...payload, authkey: auth.data });
    const aggregate = await this.repository.save(profile);

    if (!aggregate.isSuccess) return aggregate;

    return ProfileResult.succeed<string>(profile.userId);
  }
}
