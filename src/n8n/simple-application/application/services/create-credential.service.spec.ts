// src/n8n/simple-application/application/services/create-credential.service.spec.ts

// Should successfully create a new credential if the username does not exist.
// Should return a failure result with 'Credential already exists' message if a credential with the given username already exists.
// Should call 'createCredentials' with correct payload values when creating a new credential.
// Should call 'repository.save' with the newly created credential when the username does not exist.

// Mock dependencies
// Mock the createCredentials function and Credential type from credential.domain
import {CreateCredentialService} from "./create-credential.service";
import {CredentialRepository} from "../interfaces/credential-repository";
import {CreateCredentialCommand} from "../commands/create-credential.command";
import {createCredentials, Credential} from "../../domain/credential.domain";
import {Optional} from "../../_base/optional";
import {failure, Result, success} from "../../_base/result";

jest.mock('../../domain/credential.domain', () => ({
    createCredentials: jest.fn(),
}));

// Mock the success and failure functions from result.ts
jest.mock('../../_base/result', () => ({
    success: jest.fn((data: any) => ({isError: false, value: data})),
    failure: jest.fn((...errors: string[]) => ({isError: true, errors: errors})),
}));

describe('CreateCredentialService', () => {
    let service: CreateCredentialService;
    let mockCredentialRepository: jest.Mocked<CredentialRepository>;

    // Helper for Optional mock
    const createMockDefined = (value: Credential): Optional<Credential> => ({
        isEmpty: false,
        value
    });
    const createMockEmpty = (): Optional<Credential> => ({
        isEmpty: true
    });
    const createMockSuccessResult = <T>(value: T): Result<T> => ({
        isError: false,
        value
    });
    const createMockFailResult = <T>(errors: string[]): Result<T> => ({
        isError: true,
        errors
    });

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Create a mock implementation for CredentialRepository
        mockCredentialRepository = {
            findOne: jest.fn(),
            save: jest.fn(),
        } as jest.Mocked<CredentialRepository>;

        // Instantiate the service with the mocked repository
        service = new CreateCredentialService(mockCredentialRepository);
    });

    const mockPayload: CreateCredentialCommand = {
        username: 'testuser',
        password: 'testpassword123',
    };

    // Test Case 1: Should successfully create a new credential if the username does not exist.
    it('testCaseId: 1 - testCaseOrigin: CreateCredentialService.execute - testCaseDescription: Should successfully create a new credential if the username does not exist.', async () => {
        // Arrange
        mockCredentialRepository.findOne.mockResolvedValue(createMockEmpty());
        // Mock `createCredentials` to return a specific credential if needed for deeper assertions
        const createdCredentialMock = {
            id: 'new-id-123',
            username: mockPayload.username,
            password: mockPayload.password
        };
        (createCredentials as jest.Mock).mockReturnValue(createdCredentialMock);
        mockCredentialRepository.save.mockResolvedValue(createdCredentialMock.id);

        // Act
        const result = await service.execute(mockPayload);

        // Assert
        expect(mockCredentialRepository.findOne).toHaveBeenCalledWith(mockPayload.username);
        expect(createCredentials).toHaveBeenCalledWith(mockPayload.username, mockPayload.password);
        expect(mockCredentialRepository.save).toHaveBeenCalledWith(createdCredentialMock);
        expect(result.isError).toBe(false);
        if (!(result.isError)) {
            expect(result.value).toBe(createdCredentialMock.id);
        }
        expect(success).toHaveBeenCalledWith(createdCredentialMock.id);
        expect(failure).not.toHaveBeenCalled();
    });

    // Test Case 2: Should return a failure result with 'Credential already exists' message if a credential with the given username already exists.
    it('testCaseId: 2 - testCaseOrigin: CreateCredentialService.execute - testCaseDescription: Should return a failure result with \'Credential already exists\' message if a credential with the given username already exists.', async () => {
        // Arrange
        const existingCredentialMock: Credential = {
            id: 'existing-id-456-123-123',
            username: mockPayload.username,
            password: 'oldpassword'
        };
        mockCredentialRepository.findOne.mockResolvedValue(createMockDefined(existingCredentialMock)); // Username found (isEmpty = false)

        // Act
        const result = await service.execute(mockPayload);

        // Assert
        expect(mockCredentialRepository.findOne).toHaveBeenCalledWith(mockPayload.username);
        expect(result.isError).toBe(true);
        if (result.isError) {
            expect(result.errors[0]).toBe('Credential already exists');
        }
        expect(failure).toHaveBeenCalledWith('Credential already exists');
        expect(success).not.toHaveBeenCalled();
        expect(createCredentials).not.toHaveBeenCalled(); // Should not try to create new credential
        expect(mockCredentialRepository.save).not.toHaveBeenCalled(); // Should not try to save
    });

    // Test Case 3: Should call 'createCredentials' with correct payload values when creating a new credential.
    it('testCaseId: 3 - testCaseOrigin: CreateCredentialService.execute - testCaseDescription: Should call \'createCredentials\' with correct payload values when creating a new credential.', async () => {
        // Arrange
        mockCredentialRepository.findOne.mockResolvedValue(createMockEmpty()); // Username not found
        const createdCredentialMock = {
            id: 'new-id-789',
            username: mockPayload.username,
            password: mockPayload.password
        };
        (createCredentials as jest.Mock).mockReturnValue(createdCredentialMock);
        mockCredentialRepository.save.mockResolvedValue("");

        // Act
        await service.execute(mockPayload);

        // Assert
        expect(createCredentials).toHaveBeenCalledTimes(1);
        expect(createCredentials).toHaveBeenCalledWith(mockPayload.username, mockPayload.password);
    });

    // Test Case 4: Should call 'repository.save' with the newly created credential when the username does not exist.
    it('testCaseId: 4 - testCaseOrigin: CreateCredentialService.execute - testCaseDescription: Should call \'repository.save\' with the newly created credential when the username does not exist.', async () => {
        // Arrange
        mockCredentialRepository.findOne.mockResolvedValue(createMockEmpty()); // Username not found
        const expectedNewCredential: Credential = {
            id: 'generated-credential-id-123-123',
            username: mockPayload.username,
            password: mockPayload.password,
        };
        // Mock createCredentials to return a specific object that we expect to be saved
        (createCredentials as jest.Mock).mockReturnValue(expectedNewCredential);
        mockCredentialRepository.save.mockResolvedValue("");

        // Act
        await service.execute(mockPayload);

        // Assert
        expect(mockCredentialRepository.save).toHaveBeenCalledTimes(1);
        expect(mockCredentialRepository.save).toHaveBeenCalledWith(expectedNewCredential);
    });
});
