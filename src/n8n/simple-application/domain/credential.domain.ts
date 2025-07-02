export type Credential = {
    id: `${string}-${string}-${string}-${string}-${string}`;
    username: string;
    password: string;
}

export const createCredentials = (username: string, password: string): Credential => ({
    id: crypto.randomUUID(),
    username,
    password
});