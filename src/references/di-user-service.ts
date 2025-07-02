export interface IUser {
    id: string;
    name: string;
    email: string;
}

export interface IUserRepository {
    findById(id: string): Promise<IUser | undefined>;

    save(user: IUser): Promise<IUser>;
}

export class UserService {
    constructor(private readonly userRepository: IUserRepository) {
    }

    async getUserDetails(userId: string): Promise<IUser | undefined> {
        return await this.userRepository.findById(userId);
    }

    async createUser(id: string, name: string, email: string): Promise<IUser> {
        const newUser: IUser = {id, name, email};
        return await this.userRepository.save(newUser);
    }
}