// src/domain/profile.domain.spec.ts

// Should successfully create a profile with valid and non-empty username and authkey, ensuring all fields are correctly initialized/propagated.
// Should generate a unique userId using crypto.randomUUID() for the new profile.
// Should initialize 'userPreferences' as an empty array in the created profile.
// Should initialize 'events' as an empty array in the created profile (as part of Aggregate type).
// Should call 'emitProfileCreated' with the newly created and fully formed profile object.
// Should correctly create a profile when the 'username' in the payload is an empty string.
// Should correctly create a profile when the 'authkey' in the payload is an empty string.
// Should correctly create a profile when both 'username' and 'authkey' in the payload are empty strings.


import { createProfile, Profile, CreateProfilePayload } from './profile.domain';
import { emitProfileCreated } from './profile.events';
import crypto from 'node:crypto';

// Mock node:crypto to control randomUUID output
jest.mock('node:crypto', () => ({
  randomUUID: jest.fn(),
}));

// Mock profile.events to control emitProfileCreated behavior and spy on it.
// We make it return the profile it receives, mimicking its usual behavior
// if it were just an event emitter that doesn't modify the object for the caller.
jest.mock('./profile.events', () => ({
  emitProfileCreated: jest.fn((profile) => profile),
}));

describe('createProfile', () => {
  // Define a constant for the mocked UUID to ensure consistency across tests
  const MOCKED_UUID = 'mocked-user-id-123';

  // Cast the mocked functions for type safety and easier access to Jest mock methods
  const mockRandomUUID = crypto.randomUUID as jest.Mock;
  const mockEmitProfileCreated = emitProfileCreated as jest.Mock;

  beforeEach(() => {
    // Clear all mock calls and reset their implementations before each test
    // to ensure test isolation.
    mockRandomUUID.mockClear();
    mockEmitProfileCreated.mockClear();

    // Set default mock implementations for common scenarios.
    // By default, crypto.randomUUID will return our constant UUID.
    mockRandomUUID.mockReturnValue(MOCKED_UUID);
    // By default, emitProfileCreated will return the profile it received,
    // which is essential for `createProfile` to correctly return the constructed Profile object.
    mockEmitProfileCreated.mockImplementation((profile) => profile);
  });

  // testCaseId: 1
  // Should successfully create a profile with valid and non-empty username and authkey,
  // ensuring all fields are correctly initialized/propagated.
  it('testCaseId: 1 - Should successfully create a profile with valid and non-empty username and authkey, ensuring all fields are correctly initialized/propagated.', () => {
    const payload: CreateProfilePayload = {
      username: 'testuser',
      authkey: 'testauthkey',
    };

    const expectedProfile: Profile = {
      userId: MOCKED_UUID,
      username: 'testuser',
      authkey: 'testauthkey',
      userPreferences: [],
      events: [], // Expected as part of the Aggregate type
    };

    const result = createProfile(payload);

    // Use toEqual for deep comparison of objects
    expect(result).toEqual(expectedProfile);
    expect(result.username).toBe(payload.username);
    expect(result.authkey).toBe(payload.authkey);
    expect(result.userPreferences).toEqual([]);
    expect(result.events).toEqual([]);
  });

  // testCaseId: 2
  // Should generate a unique userId using crypto.randomUUID() for the new profile.
  it('testCaseId: 2 - Should generate a unique userId using crypto.randomUUID() for the new profile.', () => {
    const customUUID = 'a-unique-test-id-for-this-case';
    // Use mockReturnValueOnce to provide a specific return value for this test
    // without affecting other tests that might rely on the default MOCKED_UUID.
    mockRandomUUID.mockReturnValueOnce(customUUID);

    const payload: CreateProfilePayload = {
      username: 'anotheruser',
      authkey: 'anotherkey',
    };

    const result = createProfile(payload);

    expect(mockRandomUUID).toHaveBeenCalledTimes(1);
    expect(result.userId).toBe(customUUID);
  });

  // testCaseId: 3
  // Should initialize 'userPreferences' as an empty array in the created profile.
  it('testCaseId: 3 - Should initialize "userPreferences" as an empty array in the created profile.', () => {
    const payload: CreateProfilePayload = {
      username: 'prefsuser',
      authkey: 'prefskey',
    };

    const result = createProfile(payload);

    expect(result.userPreferences).toEqual([]);
    // Ensure it's not just an empty array, but the *same* empty array object
    // if that's a concern, though usually not for initialization.
    // For this case, `toEqual([])` is sufficient.
  });

  // testCaseId: 4
  // Should initialize 'events' as an empty array in the created profile (as part of Aggregate type).
  it('testCaseId: 4 - Should initialize "events" as an empty array in the created profile (as part of Aggregate type).', () => {
    const payload: CreateProfilePayload = {
      username: 'eventsuser',
      authkey: 'eventskey',
    };

    const result = createProfile(payload);

    expect(result.events).toEqual([]);
  });

  // testCaseId: 5
  // Should call 'emitProfileCreated' with the newly created and fully formed profile object.
  it('testCaseId: 5 - Should call "emitProfileCreated" with the newly created and fully formed profile object.', () => {
    const payload: CreateProfilePayload = {
      username: 'emitteduser',
      authkey: 'emittedkey',
    };

    // Construct the exact profile object that should be passed to emitProfileCreated
    const expectedProfileArg: Profile = {
      userId: MOCKED_UUID,
      username: 'emitteduser',
      authkey: 'emittedkey',
      userPreferences: [],
      events: [],
    };

    createProfile(payload);

    expect(mockEmitProfileCreated).toHaveBeenCalledTimes(1);
    expect(mockEmitProfileCreated).toHaveBeenCalledWith(expectedProfileArg);
  });

  // testCaseId: 6
  // Should correctly create a profile when the 'username' in the payload is an empty string.
  it('testCaseId: 6 - Should correctly create a profile when the "username" in the payload is an empty string.', () => {
    const payload: CreateProfilePayload = {
      username: '',
      authkey: 'someauthkey',
    };

    const result = createProfile(payload);

    expect(result.username).toBe('');
    expect(result.authkey).toBe(payload.authkey);
  });

  // testCaseId: 7
  // Should correctly create a profile when the 'authkey' in the payload is an empty string.
  it('testCaseId: 7 - Should correctly create a profile when the "authkey" in the payload is an empty string.', () => {
    const payload: CreateProfilePayload = {
      username: 'someusername',
      authkey: '',
    };

    const result = createProfile(payload);

    expect(result.username).toBe(payload.username);
    expect(result.authkey).toBe('');
  });

  // testCaseId: 8
  // Should correctly create a profile when both 'username' and 'authkey' in the payload are empty strings.
  it('testCaseId: 8 - Should correctly create a profile when both "username" and "authkey" in the payload are empty strings.', () => {
    const payload: CreateProfilePayload = {
      username: '',
      authkey: '',
    };

    const result = createProfile(payload);

    expect(result.username).toBe('');
    expect(result.authkey).toBe('');
    // Verify other properties are still correctly initialized
    expect(result.userId).toBe(MOCKED_UUID);
    expect(result.userPreferences).toEqual([]);
    expect(result.events).toEqual([]);
  });
});
