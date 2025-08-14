import { createCredentials, Credential } from './credentials';
import crypto from 'crypto';

describe('createCredentials', () => {
  it('should create a credential with a unique ID, username, and password', () => {
    const username = 'testuser';
    const password = 'testpassword';

    const credential = createCredentials(username, password);

    expect(credential).toHaveProperty('id');
    expect(typeof credential.id).toBe('string');
    expect(credential.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    expect(credential.username).toBe(username);
    expect(credential.password).toBe(password);
  });

  it('should generate a different ID each time', () => {
    const username = 'anotheruser';
    const password = 'anotherpassword';

    const credential1 = createCredentials(username, password);
    const credential2 = createCredentials(username, password);

    expect(credential1.id).not.toBe(credential2.id);
  });

  it('should use crypto.randomUUID for ID generation', () => {
    const username = 'user';
    const password = 'password';
    const mockRandomUUID = jest.spyOn(crypto, 'randomUUID');

    createCredentials(username, password);

    expect(mockRandomUUID).toHaveBeenCalled();
    mockRandomUUID.mockRestore();
  });
});