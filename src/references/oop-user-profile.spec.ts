import {UserProfile} from "./oop-user-profile";

describe("UserProfile", () => {
    // Mock Date for consistent test results
    const MOCKED_DATE = new Date("2023-01-01T10:00:00Z");

    beforeAll(() => {
        jest.spyOn(global, "Date").mockImplementation(() => MOCKED_DATE as any);
    });

    afterAll(() => {
        jest.restoreAllMocks(); // Restore original Date object
    });

    test("should create a user profile with valid data", () => {
        const user = new UserProfile("johndoe", "john.doe@example.com");
        expect(user.username).toBe("johndoe");
        expect(user.email).toBe("john.doe@example.com");
        expect(user.registrationDate).toEqual(MOCKED_DATE);
    });

    test("should throw error if username is empty", () => {
        expect(() => new UserProfile("", "john@example.com")).toThrow(
            "Username and email cannot be empty.",
        );
    });

    test("should throw error if email is empty", () => {
        expect(() => new UserProfile("johndoe", "")).toThrow(
            "Username and email cannot be empty.",
        );
    });

    test("should throw error if email format is invalid (no @)", () => {
        expect(() => new UserProfile("johndoe", "johnexample.com")).toThrow(
            "Invalid email format.",
        );
    });

    test("should throw error if email format is invalid (no .)", () => {
        expect(() => new UserProfile("johndoe", "john@examplecom")).toThrow(
            "Invalid email format.",
        );
    });

    test("should update email successfully with a valid new email", () => {
        const user = new UserProfile("johndoe", "john.doe@example.com");
        const success = user.updateEmail("new.john@example.org");
        expect(success).toBe(true);
        expect(user.email).toBe("new.john@example.org");
    });

    test("should not update email with an invalid format", () => {
        const user = new UserProfile("johndoe", "john.doe@example.com");
        const success = user.updateEmail("invalid-email");
        expect(success).toBe(false);
        expect(user.email).toBe("john.doe@example.com"); // Should remain unchanged
    });

    test("should not update email with an empty string", () => {
        const user = new UserProfile("johndoe", "john.doe@example.com");
        const success = user.updateEmail("");
        expect(success).toBe(false);
        expect(user.email).toBe("john.doe@example.com"); // Should remain unchanged
    });
});