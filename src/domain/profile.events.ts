import { Profile } from './profile.domain';
import {DomainEvent, emitDomainEvent} from "../_base/domain";

const eventKey = {
  created: 'profile.created',
};

export type ProfileCreatedEvent = DomainEvent<Profile>;
export const emitProfileCreated = (profile: Profile): Profile => {
  const event: ProfileCreatedEvent = {
    name: eventKey.created,
    payload: profile,
  };
  return emitDomainEvent<Profile>(profile, event);
};
export const isProfileCreatedEvent = (
  event: DomainEvent<unknown>,
): event is ProfileCreatedEvent => event.name === eventKey.created;