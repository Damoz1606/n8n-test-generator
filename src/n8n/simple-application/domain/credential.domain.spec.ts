// src/n8n/simple-application/domain/credential.domain.spec.ts

// Should create a Credential object with the correct username and password
// Should generate a unique ID for each new credential
// Should handle empty username and password strings


// Mock the crypto module globally for these tests
jest.mock('crypto', () => ({
  randomUUID: jest.fn(),
}));

// Get a reference to the mocked randomUUID function
const mockRandomUUID = require('crypto').randomUUID as jest.Mock;

describe('createCredentials', () => {
  beforeEach(() => {
    // Reset the mock before each test to ensure isolation
    mockRandomUUID.mockClear();
  });

  describe('creation', () => {
    it('Should create a Credential object with the correct username and password', () => {
      const expectedId = 'mock-id-123';
      mockRandomUUID.mockReturnValue(expectedId);

      const username = 'testuser';
      const password = 'testpassword';
      const credential = createCredentials(username, password);

      expect(credential.username).toBe(username);
      expect(credential.password).toBe(password);
      expect(credential.id).toBe(expectedId);
      expect(mockRandomUUID).toHaveBeenCalledTimes(1);
    });

    it('Should generate a unique ID for each new credential', () => {
      mockRandomUUID.mockReturnValueOnce('uuid-first-call').mockReturnValueOnce('uuid-second-call');

      const credential1 = createCredentials('userOne', 'passOne');
      const credential2 = createCredentials('userTwo', 'passTwo');

      expect(credential1.id).toBe('uuid-first-call');
      expect(credential2.id).toBe('uuid-second-call');
      expect(credential1.id).not.toBe(credential2.id);
      expect(mockRandomUUID).toHaveBeenCalledTimes(2);
    });

    it('Should handle empty username and password strings', () => {
      const expectedId = 'empty-id-xyz';
      mockRandomUUID.mockReturnValue(expectedId);

      const username = '';
      const password = '';
      const credential = createCredentials(username, password);

      expect(credential.username).toBe('');
      expect(credential.password).toBe('');
      expect(credential.id).toBe(expectedId);
      expect(mockRandomUUID).toHaveBeenCalledTimes(1);
    });
  });
});
