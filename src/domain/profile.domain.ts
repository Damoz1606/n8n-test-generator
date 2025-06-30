import crypto from 'node:crypto';
import {Aggregate} from "../_base/domain";
import {emitProfileCreated} from "./profile.events";

export type Profile = Aggregate & {
  userId: string;
  authkey: string;
  username: string;
  userPreferences: string[];
};

export type CreateProfilePayload = {
  authkey: string;
  username: string;
};

export const createProfile = (payload: CreateProfilePayload): Profile => {
  const profile: Profile = {
    userId: crypto.randomUUID(),
    userPreferences: [],
    events: [],
    ...payload,
  };
  return emitProfileCreated(profile);
};
