// src/n8n/simple-application/domain/credential.domain.spec.ts

// Should create a credential object with the provided username and password.
// Should correctly assign the provided username to the 'username' field.
// Should correctly assign the provided password to the 'password' field.
// Should generate a valid UUID string for the 'id' field.
// Should generate a unique 'id' for each distinct call to the function.
// Should handle an empty string for the username.
// Should handle an empty string for the password.
// Should handle usernames containing special characters.
// Should handle passwords containing special characters.
// Should handle very long username strings without truncation or error.
// Should handle very long password strings without truncation or error.



describe('createCredentials', () => {
  let mockRandomUUID: jest.SpyInstance;

  beforeEach(() => {
    // Mock crypto.randomUUID() to ensure deterministic IDs for most tests
    // and to control its behavior for specific ID-related tests.
    // We spy on global.crypto as it's a built-in browser/node API.
    mockRandomUUID = jest.spyOn(global.crypto, 'randomUUID');

    // Default mock for randomUUID, can be overridden by specific tests
    // This ensures a predictable ID for basic tests, making assertions easier.
    mockRandomUUID.mockReturnValue('mock-uuid-1234-abcd-efgh-ijkl-mnop');
  });

  afterEach(() => {
    // Restore the original implementation after each test
    mockRandomUUID.mockRestore();
  });

  // Test Case 1, 2, 3: Should create a credential object with the provided username and password,
  // and correctly assign them to their respective fields.
  it('testCaseId: 1, 2, 3 - Should create a credential object with the provided username and password and correctly assign fields', () => {
    const username = 'testuser';
    const password = 'testpassword123';

    const result: Credential = createCredentials(username, password);

    expect(result).toBeDefined();
    expect(result.username).toBe(username);
    expect(result.password).toBe(password);
    expect(result).toHaveProperty('id');
    expect(typeof result.id).toBe('string');
  });

  // Test Case 4: Should generate a valid UUID string for the 'id' field.
  it('testCaseId: 4 - Should generate a valid UUID string for the "id" field', () => {
    // Ensure the mock returns a string that matches a UUID format
    const expectedUuid = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
    mockRandomUUID.mockReturnValue(expectedUuid);

    const result: Credential = createCredentials('user', 'pass');

    expect(result.id).toBe(expectedUuid);
    // Regex for a standard UUID v4 format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(result.id).toMatch(uuidRegex);
  });

  // Test Case 5: Should generate a unique 'id' for each distinct call to the function.
  it('testCaseId: 5 - Should generate a unique "id" for each distinct call to the function', () => {
    // Mock randomUUID to return different values on successive calls
    mockRandomUUID
      .mockReturnValueOnce('unique-uuid-1')
      .mockReturnValueOnce('unique-uuid-2');

    const result1: Credential = createCredentials('user1', 'pass1');
    const result2: Credential = createCredentials('user2', 'pass2');

    expect(result1.id).not.toBe(result2.id);
    expect(result1.id).toBe('unique-uuid-1');
    expect(result2.id).toBe('unique-uuid-2');
  });

  // Test Case 6: Should handle an empty string for the username.
  it('testCaseId: 6 - Should handle an empty string for the username', () => {
    const username = '';
    const password = 'anypassword';
    const result: Credential = createCredentials(username, password);

    expect(result.username).toBe(username);
    expect(result.password).toBe(password);
  });

  // Test Case 7: Should handle an empty string for the password.
  it('testCaseId: 7 - Should handle an empty string for the password', () => {
    const username = 'anyuser';
    const password = '';
    const result: Credential = createCredentials(username, password);

    expect(result.username).toBe(username);
    expect(result.password).toBe(password);
  });

  // Test Case 8: Should handle usernames containing special characters.
  it('testCaseId: 8 - Should handle usernames containing special characters', () => {
    const username = '!@#$%^&*()_+{}|:"<>?~`';
    const password = 'password123';
    const result: Credential = createCredentials(username, password);

    expect(result.username).toBe(username);
    expect(result.password).toBe(password);
  });

  // Test Case 9: Should handle passwords containing special characters.
  it('testCaseId: 9 - Should handle passwords containing special characters', () => {
    const username = 'regularUser';
    const password = '!@#$%^&*()_+{}|:"<>?~`';
    const result: Credential = createCredentials(username, password);

    expect(result.username).toBe(username);
    expect(result.password).toBe(password);
  });

  // Test Case 10: Should handle very long username strings without truncation or error.
  it('testCaseId: 10 - Should handle very long username strings without truncation or error', () => {
    const longUsername = 'a'.repeat(10000); // A very long string
    const password = 'shortpass';
    const result: Credential = createCredentials(longUsername, password);

    expect(result.username).toBe(longUsername);
    expect(result.username.length).toBe(10000);
    expect(result.password).toBe(password);
  });

  // Test Case 11: Should handle very long password strings without truncation or error.
  it('testCaseId: 11 - Should handle very long password strings without truncation or error', () => {
    const username = 'shortuser';
    const longPassword = 'b'.repeat(10000); // A very long string
    const result: Credential = createCredentials(username, longPassword);

    expect(result.username).toBe(username);
    expect(result.password).toBe(longPassword);
    expect(result.password.length).toBe(10000);
  });
});
