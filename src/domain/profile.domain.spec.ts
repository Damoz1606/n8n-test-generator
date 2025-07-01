// src/domain/profile.domain.spec.ts

// Should successfully create a profile with valid payload and generate a userId.
// Should ensure the generated profile includes the authkey from the payload.
// Should ensure the generated profile includes the username from the payload.
// Should initialize userPreferences as an empty array for a new profile.
// Should call emitProfileCreated with the newly created profile.
// Should create a profile when username is an empty string.
// Should create a profile when authkey is an empty string.
// Should create a profile with long username and authkey values.
// Should ensure the userId is a valid UUID format.


// Assuming the test file is located at `src/domain/__tests__/` based on the project structure.

import { createProfile, Profile } from '../profile.domain';
import { emitProfileCreated } from '../profile.events';
import crypto from 'node:crypto'; // Import for type hinting on the mock

// Mock the 'node:crypto' module, specifically the randomUUID function.
// This ensures deterministic UUIDs for testing and avoids actual crypto operations.
jest.mock('node:crypto', () => ({
  randomUUID: jest.fn(),
}));

// Mock the 'profile.events' module, specifically the emitProfileCreated function.
// The mock implementation is set to simply return the profile it receives,
// mimicking a typical event emission and aggregate return flow.
jest.mock('../profile.events', () => ({
  emitProfileCreated: jest.fn((profile: Profile) => profile),
}));

// Cast the mocked functions to Jest Mock functions for type safety and access to Jest's powerful mock API.
const mockRandomUUID = crypto.randomUUID as jest.Mock;
const mockEmitProfileCreated = emitProfileCreated as jest.Mock;

describe('createProfile', () => {
  // A static, predictable UUID used for all tests to ensure deterministic outcomes.
  const STATIC_MOCK_USER_ID = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
  // A standard valid payload used across multiple tests.
  const VALID_PAYLOAD = {
    authkey: 'testAuthKey123',
    username: 'testUser',
  };

  // Regular expression to validate a UUID v4 format.
  const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  // Before each test, clear all mock calls and reset their implementations to defaults.
  // This ensures test isolation and prevents side effects between tests.
  beforeEach(() => {
    jest.clearAllMocks();
    mockRandomUUID.mockReturnValue(STATIC_MOCK_USER_ID);
    mockEmitProfileCreated.mockImplementation((profile: Profile) => profile);
  });

  // testCaseId: "1", testCaseDescription: "Should successfully create a profile with valid payload and generate a userId."
  it('testCaseId: "1" - Should successfully create a profile with valid payload and generate a userId.', () => {
    const result = createProfile(VALID_PAYLOAD);

    // Assert that the profile object is created and contains expected values.
    expect(result).toBeDefined();
    expect(result.userId).toBe(STATIC_MOCK_USER_ID);
    expect(result.authkey).toBe(VALID_PAYLOAD.authkey);
    expect(result.username).toBe(VALID_PAYLOAD.username);
    expect(result.userPreferences).toEqual([]);
    // Assuming 'events' is part of the 'Aggregate' type and is initialized as an empty array.
    expect(result.events).toEqual([]);
  });

  // testCaseId: "2", testCaseDescription: "Should ensure the generated profile includes the authkey from the payload."
  it('testCaseId: "2" - Should ensure the generated profile includes the authkey from the payload.', () => {
    const customAuthkey = 'newSecureAuthKey_XYZ';
    const payload = { ...VALID_PAYLOAD, authkey: customAuthkey };
    const result = createProfile(payload);
    expect(result.authkey).toBe(customAuthkey);
  });

  // testCaseId: "3", testCaseDescription: "Should ensure the generated profile includes the username from the payload."
  it('testCaseId: "3" - Should ensure the generated profile includes the username from the payload.', () => {
    const customUsername = 'anotherTestUser';
    const payload = { ...VALID_PAYLOAD, username: customUsername };
    const result = createProfile(payload);
    expect(result.username).toBe(customUsername);
  });

  // testCaseId: "4", testCaseDescription: "Should initialize userPreferences as an empty array for a new profile."
  it('testCaseId: "4" - Should initialize userPreferences as an empty array for a new profile.', () => {
    const result = createProfile(VALID_PAYLOAD);
    expect(result.userPreferences).toEqual([]);
    expect(Array.isArray(result.userPreferences)).toBe(true);
  });

  // testCaseId: "5", testCaseDescription: "Should call emitProfileCreated with the newly created profile."
  it('testCaseId: "5" - Should call emitProfileCreated with the newly created profile.', () => {
    // Define the expected profile object that should be passed to emitProfileCreated.
    const expectedProfile = {
      userId: STATIC_MOCK_USER_ID,
      authkey: VALID_PAYLOAD.authkey,
      username: VALID_PAYLOAD.username,
      userPreferences: [],
      events: [],
    };

    const result = createProfile(VALID_PAYLOAD);

    // Assert that emitProfileCreated was called exactly once.
    expect(mockEmitProfileCreated).toHaveBeenCalledTimes(1);
    // Assert that emitProfileCreated was called with an object matching the expected profile.
    expect(mockEmitProfileCreated).toHaveBeenCalledWith(
      expect.objectContaining(expectedProfile)
    );
    // Assert that the result of createProfile is the object returned by emitProfileCreated.
    expect(result).toEqual(expect.objectContaining(expectedProfile));
  });

  // testCaseId: "6", testCaseDescription: "Should create a profile when username is an empty string."
  it('testCaseId: "6" - Should create a profile when username is an empty string.', () => {
    const payloadWithEmptyUsername = { ...VALID_PAYLOAD, username: '' };
    const result = createProfile(payloadWithEmptyUsername);
    expect(result.username).toBe('');
    expect(result.userId).toBe(STATIC_MOCK_USER_ID); // Ensure userId is still generated
  });

  // testCaseId: "7", testCaseDescription: "Should create a profile when authkey is an empty string."
  it('testCaseId: "7" - Should create a profile when authkey is an empty string.', () => {
    const payloadWithEmptyAuthkey = { ...VALID_PAYLOAD, authkey: '' };
    const result = createProfile(payloadWithEmptyAuthkey);
    expect(result.authkey).toBe('');
    expect(result.userId).toBe(STATIC_MOCK_USER_ID); // Ensure userId is still generated
  });

  // testCaseId: "8", testCaseDescription: "Should create a profile with long username and authkey values."
  it('testCaseId: "8" - Should create a profile with long username and authkey values.', () => {
    const longUsername = 'u'.repeat(255); // Create a very long string for username
    const longAuthkey = 'a'.repeat(512); // Create a very long string for authkey
    const longPayload = { username: longUsername, authkey: longAuthkey };

    const result = createProfile(longPayload);
    expect(result.username).toBe(longUsername);
    expect(result.authkey).toBe(longAuthkey);
    expect(result.userId).toBe(STATIC_MOCK_USER_ID); // Ensure userId is still generated
  });

  // testCaseId: "9", testCaseDescription: "Should ensure the userId is a valid UUID format."
  it('testCaseId: "9" - Should ensure the userId is a valid UUID format.', () => {
    // Since `STATIC_MOCK_USER_ID` is a valid UUID v4, we can directly assert against it.
    // This tests that the `userId` field correctly holds a UUID formatted string.
    const result = createProfile(VALID_PAYLOAD);
    expect(result.userId).toMatch(UUID_V4_REGEX);
  });
});
