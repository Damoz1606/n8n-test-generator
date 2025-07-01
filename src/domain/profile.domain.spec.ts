// src/domain/profile.domain.spec.ts

// Should successfully create a profile with all required properties populated.
// Should generate a unique userId using crypto.randomUUID().
// Should initialize userPreferences as an empty array.
// Should initialize events as an empty array.
// Should correctly assign the username from the payload to the created profile.
// Should correctly assign the authkey from the payload to the created profile.
// Should call the emitProfileCreated function with the newly constructed profile object.
// Should return the result of the emitProfileCreated function.
// Should create a profile successfully when username is an empty string.
// Should create a profile successfully when authkey is an empty string.



// Mock the 'node:crypto' module. This must be done before the module under test is imported,
// as the module under test uses `crypto.randomUUID()`.
jest.mock('node:crypto', () => ({
  randomUUID: jest.fn(),
}));

// Mock the './profile.events' module. This must be done before the module under test is imported.
jest.mock('./profile.events', () => ({
  emitProfileCreated: jest.fn(),
}));

// Import the function and types to be tested, along with the mocked functions for direct access.
import { createProfile, Profile, CreateProfilePayload } from './profile';
import { emitProfileCreated } from './profile.events';
import crypto from 'node:crypto'; // Import crypto for type casting

describe('createProfile', () => {
  // Define mock values used across tests for consistency
  const MOCK_UUID = 'mock-user-id-12345';
  const MOCK_EMIT_RESULT_FROM_EVENT = { status: 'success', message: 'Profile created event emitted' };

  // Cast mocked functions to JestMock types for easier access to mock methods
  const mockRandomUUID = crypto.randomUUID as jest.Mock;
  const mockEmitProfileCreated = emitProfileCreated as jest.Mock;

  // Reset and set default mock implementations before each test
  beforeEach(() => {
    // Clear any previous calls, instances, and results from mocks
    mockRandomUUID.mockClear();
    mockEmitProfileCreated.mockClear();

    // Set default mock implementation for crypto.randomUUID
    mockRandomUUID.mockReturnValue(MOCK_UUID);

    // Set default mock implementation for emitProfileCreated.
    // By default, it will return the profile object it received,
    // which simplifies testing the return value of `createProfile` unless specifically overridden.
    mockEmitProfileCreated.mockImplementation((profile: Profile) => profile);
  });

  // Test Case 1: "Should successfully create a profile with all required properties populated."
  it('testCaseId: 1 | Should successfully create a profile with all required properties populated.', () => {
    const payload: CreateProfilePayload = {
      authkey: 'superSecureAuthKey',
      username: 'johnDoe123',
    };

    const expectedProfile: Profile = {
      userId: MOCK_UUID,
      authkey: payload.authkey,
      username: payload.username,
      userPreferences: [],
      events: [],
    };

    const result = createProfile(payload);

    // Verify the returned profile has all expected properties and values
    expect(result).toEqual(expectedProfile);

    // Also verify that emitProfileCreated was called with this correctly structured profile
    expect(mockEmitProfileCreated).toHaveBeenCalledWith(expect.objectContaining(expectedProfile));
  });

  // Test Case 2: "Should generate a unique userId using crypto.randomUUID()."
  it('testCaseId: 2 | Should generate a unique userId using crypto.randomUUID().', () => {
    const payload: CreateProfilePayload = {
      authkey: 'some_key',
      username: 'some_user',
    };

    createProfile(payload);

    // Ensure crypto.randomUUID was called exactly once
    expect(mockRandomUUID).toHaveBeenCalledTimes(1);

    // Verify the userId in the profile passed to emitProfileCreated matches our mock UUID
    const profilePassedToEvent = mockEmitProfileCreated.mock.calls[0][0];
    expect(profilePassedToEvent.userId).toBe(MOCK_UUID);
  });

  // Test Case 3: "Should initialize userPreferences as an empty array."
  it('testCaseId: 3 | Should initialize userPreferences as an empty array.', () => {
    const payload: CreateProfilePayload = {
      authkey: 'key',
      username: 'name',
    };

    createProfile(payload);

    // Get the profile object that was passed to emitProfileCreated
    const profilePassedToEvent = mockEmitProfileCreated.mock.calls[0][0];

    // Verify userPreferences is an empty array
    expect(profilePassedToEvent.userPreferences).toEqual([]);
    expect(profilePassedToEvent.userPreferences).toBeInstanceOf(Array);
    expect(profilePassedToEvent.userPreferences.length).toBe(0);
  });

  // Test Case 4: "Should initialize events as an empty array."
  it('testCaseId: 4 | Should initialize events as an empty array.', () => {
    const payload: CreateProfilePayload = {
      authkey: 'key',
      username: 'name',
    };

    createProfile(payload);

    // Get the profile object that was passed to emitProfileCreated
    const profilePassedToEvent = mockEmitProfileCreated.mock.calls[0][0];

    // Verify events is an empty array
    expect(profilePassedToEvent.events).toEqual([]);
    expect(profilePassedToEvent.events).toBeInstanceOf(Array);
    expect(profilePassedToEvent.events.length).toBe(0);
  });

  // Test Case 5: "Should correctly assign the username from the payload to the created profile."
  it('testCaseId: 5 | Should correctly assign the username from the payload to the created profile.', () => {
    const expectedUsername = 'AliceSmith';
    const payload: CreateProfilePayload = {
      authkey: 'anotherKey',
      username: expectedUsername,
    };

    createProfile(payload);

    // Get the profile object that was passed to emitProfileCreated
    const profilePassedToEvent = mockEmitProfileCreated.mock.calls[0][0];

    // Verify username matches the payload's username
    expect(profilePassedToEvent.username).toBe(expectedUsername);
  });

  // Test Case 6: "Should correctly assign the authkey from the payload to the created profile."
  it('testCaseId: 6 | Should correctly assign the authkey from the payload to the created profile.', () => {
    const expectedAuthkey = 'authkeyForBob';
    const payload: CreateProfilePayload = {
      authkey: expectedAuthkey,
      username: 'BobJohnson',
    };

    createProfile(payload);

    // Get the profile object that was passed to emitProfileCreated
    const profilePassedToEvent = mockEmitProfileCreated.mock.calls[0][0];

    // Verify authkey matches the payload's authkey
    expect(profilePassedToEvent.authkey).toBe(expectedAuthkey);
  });

  // Test Case 7: "Should call the emitProfileCreated function with the newly constructed profile object."
  it('testCaseId: 7 | Should call the emitProfileCreated function with the newly constructed profile object.', () => {
    const payload: CreateProfilePayload = {
      authkey: 'someAuth',
      username: 'someUser',
    };

    // Define the expected structure that should be passed to emitProfileCreated
    const expectedProfilePassed: Profile = {
      userId: MOCK_UUID,
      authkey: payload.authkey,
      username: payload.username,
      userPreferences: [],
      events: [],
    };

    createProfile(payload);

    // Verify emitProfileCreated was called exactly once
    expect(mockEmitProfileCreated).toHaveBeenCalledTimes(1);

    // Verify emitProfileCreated was called with an object matching the expected structure
    expect(mockEmitProfileCreated).toHaveBeenCalledWith(expect.objectContaining(expectedProfilePassed));
  });

  // Test Case 8: "Should return the result of the emitProfileCreated function."
  it('testCaseId: 8 | Should return the result of the emitProfileCreated function.', () => {
    const payload: CreateProfilePayload = {
      authkey: 'test_return_key',
      username: 'test_return_user',
    };

    // Override the default mock implementation to return a specific value
    mockEmitProfileCreated.mockReturnValue(MOCK_EMIT_RESULT_FROM_EVENT);

    const result = createProfile(payload);

    // Verify that createProfile returns exactly what emitProfileCreated returned
    expect(result).toBe(MOCK_EMIT_RESULT_FROM_EVENT);
  });

  // Test Case 9: "Should create a profile successfully when username is an empty string."
  it('testCaseId: 9 | Should create a profile successfully when username is an empty string.', () => {
    const payload: CreateProfilePayload = {
      authkey: 'authkey_for_empty_user',
      username: '', // Empty username
    };

    const expectedProfile: Profile = {
      userId: MOCK_UUID,
      authkey: payload.authkey,
      username: payload.username,
      userPreferences: [],
      events: [],
    };

    const result = createProfile(payload);

    // Verify the returned profile is correctly structured even with an empty username
    expect(result).toEqual(expectedProfile);
    expect(mockEmitProfileCreated).toHaveBeenCalledWith(expect.objectContaining(expectedProfile));
  });

  // Test Case 10: "Should create a profile successfully when authkey is an empty string."
  it('testCaseId: 10 | Should create a profile successfully when authkey is an empty string.', () => {
    const payload: CreateProfilePayload = {
      authkey: '', // Empty authkey
      username: 'user_for_empty_authkey',
    };

    const expectedProfile: Profile = {
      userId: MOCK_UUID,
      authkey: payload.authkey,
      username: payload.username,
      userPreferences: [],
      events: [],
    };

    const result = createProfile(payload);

    // Verify the returned profile is correctly structured even with an empty authkey
    expect(result).toEqual(expectedProfile);
    expect(mockEmitProfileCreated).toHaveBeenCalledWith(expect.objectContaining(expectedProfile));
  });
});
