const ensureNonEmptyEmailAndUsername = (email: string, username: string) => {
    if (!username || !email)
        throw new Error("Username and email cannot be empty.");
}

const ensureIsEmailValid = (email: string) => {
    if (!email.includes("@") || !email.includes("."))
        throw new Error("Invalid email format.");
}

export class UserProfile {
    private readonly _registrationDate: Date = new Date();

    constructor(
        private readonly _username: string,
        private _email: string
    ) {
        ensureNonEmptyEmailAndUsername(_username, _email);
        ensureIsEmailValid(_email);
    }

    public get username(): string {
        return this._username;
    }

    public get email(): string {
        return this._email;
    }

    public get registrationDate(): Date {
        return this._registrationDate;
    }

    public updateEmail(newEmail: string): boolean {
        if (!newEmail || !newEmail.includes("@") || !newEmail.includes(".")) {
            return false;
        }
        this._email = newEmail;
        return true;
    }
}