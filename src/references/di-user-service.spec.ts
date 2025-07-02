import {IUserRepository, UserService} from "./di-user-service";

describe("UserService", () => {
    let mockUserRepository: jest.Mocked<IUserRepository>;
    let userService: UserService;

    beforeEach(() => {
        mockUserRepository = {
            findById: jest.fn(),
            save: jest.fn(),
        };
        userService = new UserService(mockUserRepository);
    });

    test("should get user details if user exists", async () => {
        const mockUser = { id: "test1", name: "Test User", email: "test@test.com" };
        mockUserRepository.findById.mockResolvedValue(mockUser);

        const user = await userService.getUserDetails("test1");
        expect(user).toEqual(mockUser);
        expect(mockUserRepository.findById).toHaveBeenCalledWith("test1");
    });

    test("should return undefined if user does not exist", async () => {
        mockUserRepository.findById.mockResolvedValue(undefined);

        const user = await userService.getUserDetails("nonexistent");
        expect(user).toBeUndefined();
        expect(mockUserRepository.findById).toHaveBeenCalledWith("nonexistent");
    });

    test("should create a new user and save it", async () => {
        const newUser = { id: "newid", name: "New User", email: "new@user.com" };
        mockUserRepository.save.mockResolvedValue(newUser);

        const savedUser = await userService.createUser(
            "newid",
            "New User",
            "new@user.com",
        );
        expect(savedUser).toEqual(newUser);
        expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
        expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
    });
});