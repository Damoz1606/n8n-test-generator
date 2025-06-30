import { Profile } from '../../domain/profile.domain';
import {AggregateRepository} from "../../_base/repository";

export type ProfileAggregateRepository = AggregateRepository<Profile>;
