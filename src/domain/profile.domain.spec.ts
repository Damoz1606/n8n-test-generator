// src/domain/profile.domain.spec.ts

// Should create a profile with valid payload and all required fields.
// Should ensure the 'userId' is a generated UUID string.
// Should initialize 'userPreferences' as an empty array.
// Should initialize 'events' as an empty array.
// Should correctly assign 'username' from the payload.
// Should correctly assign 'authkey' from the payload.
// Should call 'emitProfileCreated' with the newly created profile.
// Should create a profile when 'username' is an empty string.
// Should create a profile when 'authkey' is an empty string.


import { createProfile, Profile, CreateProfilePayload } from './profile.domain';
import { emitProfileCreated } from './profile.events';

// Mock the crypto module specifically for randomUUID to ensure deterministic UUIDs in tests.
jest.mock('node:crypto', () => ({
  ...jest.requireActual('node:crypto'), // Keep other original crypto functions
  randomUUID: jest.fn(), // Mock randomUUID
}));

// Mock the emitProfileCreated function.
// The `createProfile` function returns the result of `emitProfileCreated`,
// so we mock it to return the profile object it receives to maintain the flow.
jest.mock('./profile.events', () => ({
  emitProfileCreated: jest.fn((profile: Profile) => profile),
}));

describe('createProfile', () => {
  const MOCKED_UUID = 'generated-uuid-123-abc';
  const MOCKED_AUTHKEY = 'sampleAuthKeyForUser';
  const MOCKED_USERNAME = 'newuser123';

  const defaultPayload: CreateProfilePayload = {
    authkey: MOCKED_AUTHKEY,
    username: MOCKED_USERNAME,
  };

  // Reset mocks and set up common mock returns before each test.
  beforeEach(() => {
    (crypto.randomUUID as jest.Mock).mockReturnValue(MOCKED_UUID);
    (emitProfileCreated as jest.Mock).mockClear(); // Clear call history
    // Ensure emitProfileCreated returns the profile it received.
    (emitProfileCreated as jest.Mock).mockImplementation((profile: Profile) => profile);
  });

  // Test Case 1: Should create a profile with valid payload and all required fields.
  it('1: Should create a profile with valid payload and all required fields.', () => {
    const result = createProfile(defaultPayload);

    const expectedProfile: Profile = {
      userId: MOCKED_UUID,
      authkey: MOCKED_AUTHKEY,
      username: MOCKED_USERNAME,
      userPreferences: [],
      // Note: Based on the provided code, the `events: []` initialization
      // is missing in the `createProfile` function's object literal.
      // However, this test case and others imply `events` should be an empty array.
      // This expectation is based on the test case description and typical aggregate patterns.
      events: [],
    };

    expect(result).toEqual(expectedProfile);
    expect(crypto.randomUUID).toHaveBeenCalledTimes(1);
    expect(emitProfileCreated).toHaveBeenCalledTimes(1);
  });

  // Test Case 2: Should ensure the 'userId' is a generated UUID string.
  it('2: Should ensure the "userId" is a generated UUID string.', () => {
    const anotherMockedUUID = 'another-generated-uuid-456-def';
    (crypto.randomUUID as jest.Mock).mockReturnValueOnce(anotherMockedUUID); // Only for this test

    const result = createProfile(defaultPayload);

    expect(result.userId).toBe(anotherMockedUUID);
    expect(crypto.randomUUID).toHaveBeenCalledTimes(1);
  });

  // Test Case 3: Should initialize 'userPreferences' as an empty array.
  it('3: Should initialize "userPreferences" as an empty array.', () => {
    const result = createProfile(defaultPayload);

    expect(result.userPreferences).toEqual([]);
    expect(Array.isArray(result.userPreferences)).toBe(true);
    expect(result.userPreferences.length).toBe(0);
  });

  // Test Case 4: Should initialize 'events' as an empty array.
  it('4: Should initialize "events" as an empty array.', () => {
    const result = createProfile(defaultPayload);

    // As noted in Test Case 1, this expectation is based on the test case description,
    // as the provided `createProfile` code snippet implicitly relies on `Aggregate`
    // or external logic to add `events: []`.
    expect(result.events).toEqual([]);
    expect(Array.isArray(result.events)).toBe(true);
    expect(result.events.length).toBe(0);
  });

  // Test Case 5: Should correctly assign 'username' from the payload.
  it('5: Should correctly assign "username" from the payload.', () => {
    const customUsername = 'jane.doe';
    const payloadWithCustomUsername = { ...defaultPayload, username: customUsername };

    const result = createProfile(payloadWithCustomUsername);

    expect(result.username).toBe(customUsername);
  });

  // Test Case 6: Should correctly assign 'authkey' from the payload.
  it('6: Should correctly assign "authkey" from the payload.', () => {
    const customAuthkey = 'superSecretKeyXYZ';
    const payloadWithCustomAuthkey = { ...defaultPayload, authkey: customAuthkey };

    const result = createProfile(payloadWithCustomAuthkey);

    expect(result.authkey).toBe(customAuthkey);
  });

  // Test Case 7: Should call 'emitProfileCreated' with the newly created profile.
  it('7: Should call "emitProfileCreated" with the newly created profile.', () => {
    createProfile(defaultPayload);

    // Construct the expected profile passed to emitProfileCreated
    const expectedProfileSentToEmitter: Profile = {
      userId: MOCKED_UUID,
      authkey: MOCKED_AUTHKEY,
      username: MOCKED_USERNAME,
      userPreferences: [],
      events: [], // Expecting events to be initialized as empty array
    };

    expect(emitProfileCreated).toHaveBeenCalledTimes(1);
    // Use `toHaveBeenCalledWith(expect.objectContaining(...))` for robustness,
    // as it verifies the key properties without requiring an exact object identity.
    expect(emitProfileCreated).toHaveBeenCalledWith(expect.objectContaining(expectedProfileSentToEmitter));
  });

  // Test Case 8: Should create a profile when 'username' is an empty string.
  it('8: Should create a profile when "username" is an empty string.', () => {
    const payloadEmptyUsername: CreateProfilePayload = {
      authkey: MOCKED_AUTHKEY,
      username: '',
    };
    const result = createProfile(payloadEmptyUsername);

    expect(result.username).toBe('');
    expect(result.userId).toBe(MOCKED_UUID);
    expect(result.authkey).toBe(MOCKED_AUTHKEY);
    expect(result.userPreferences).toEqual([]);
    expect(result.events).toEqual([]);
    expect(emitProfileCreated).toHaveBeenCalledTimes(1);
  });

  // Test Case 9: Should create a profile when 'authkey' is an empty string.
  it('9: Should create a profile when "authkey" is an empty string.', () => {
    const payloadEmptyAuthkey: CreateProfilePayload = {
      authkey: '',
      username: MOCKED_USERNAME,
    };
    const result = createProfile(payloadEmptyAuthkey);

    expect(result.authkey).toBe('');
    expect(result.userId).toBe(MOCKED_UUID);
    expect(result.username).toBe(MOCKED_USERNAME);
    expect(result.userPreferences).toEqual([]);
    expect(result.events).toEqual([]);
    expect(emitProfileCreated).toHaveBeenCalledTimes(1);
  });
});
