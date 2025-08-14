describe('createCredentials', () => {
    it('should create a credential with a unique ID, username, and password', () => {
        const username = 'testuser';
        const password = 'testpassword';
        const credential = createCredentials(username, password);

        expect(credential).toHaveProperty('id');
        expect(typeof credential.id).toBe('string');
        expect(credential.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        expect(credential.username).toBe(username);
        expect(credential.password).toBe(password);
    });

    it('should generate a different ID on each call', () => {
        const username = 'anotheruser';
        const password = 'anotherpassword';
        const credential1 = createCredentials(username, password);
        const credential2 = createCredentials(username, password);

        expect(credential1.id).not.toBe(credential2.id);
    });
});