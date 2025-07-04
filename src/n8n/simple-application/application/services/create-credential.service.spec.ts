// src/n8n/simple-application/application/services/create-credential.service.spec.ts

// Should successfully create a new credential when the username does not exist
// Should return a failure result when a credential with the given username already exists
// Should call the findOne method on the repository with the correct username
// Should call the save method on the repository with the newly created credential
// Should return the ID of the created credential on successful creation

import { CreateCredentialCommand } from '../../application/commands/create-credential.command';
import { CredentialRepository } from '../../../infrastructure/interfaces/credential-repository';
import { Credentials } from '../../../domain/credential.domain';

describe('CreateCredentialService', () => {
  let service: CreateCredentialService;
  let mockCredentialRepository: jest.Mocked<CredentialRepository>;

  beforeEach(() => {
    // Initialize mock repository with jest.fn() for methods
    mockCredentialRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };
    // Instantiate the service with the mocked repository
    service = new CreateCredentialService(mockCredentialRepository);
  });

  afterEach(() => {
    // Clear all mocks after each test to ensure isolation
    jest.clearAllMocks();
  });

  // Test Scenario: Should successfully create a new credential when the username does not exist
  it('should successfully create a new credential when the username does not exist', async () => {
    const command = new CreateCredentialCommand('newuser', 'newpassword');
    const expectedId = 'generated-credential-id-1';
    const mockCreatedCredential: Credentials = {
      id: expectedId,
      username: command.username,
      password: 'hashed_newpassword', // Assuming the service hashes the password
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockCredentialRepository.findOne.mockResolvedValue(null); // No existing credential found
    mockCredentialRepository.save.mockResolvedValue(mockCreatedCredential); // Service saves the new credential

    const result = await service.execute(command);

    expect(result.isSuccess).toBe(true);
    expect(result.value).toBe(expectedId);
    expect(mockCredentialRepository.findOne).toHaveBeenCalledWith(command.username);
    expect(mockCredentialRepository.save).toHaveBeenCalledTimes(1);
    expect(mockCredentialRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      username: command.username,
      password: expect.any(String), // Password should be a hashed string
    }));
  });

  // Test Scenario: Should return a failure result when a credential with the given username already exists
  it('should return a failure result when a credential with the given username already exists', async () => {
    const command = new CreateCredentialCommand('existinguser', 'somepass');
    const existingCredential: Credentials = {
      id: 'existing-id',
      username: 'existinguser',
      password: 'hashedpass',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockCredentialRepository.findOne.mockResolvedValue(existingCredential); // An existing credential is found

    const result = await service.execute(command);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe(`Credential with username ${command.username} already exists.`);
    expect(mockCredentialRepository.findOne).toHaveBeenCalledWith(command.username);
    expect(mockCredentialRepository.save).not.toHaveBeenCalled(); // Save should not be called
  });

  // Test Scenario: Should call the findOne method on the repository with the correct username
  it('should call the findOne method on the repository with the correct username', async () => {
    const command = new CreateCredentialCommand('specificuser', 'specificpass');

    // Mock both findOne and save to allow the execution to complete without errors for this specific test
    mockCredentialRepository.findOne.mockResolvedValue(null);
    mockCredentialRepository.save.mockResolvedValue({ id: 'some-id' } as Credentials);

    await service.execute(command);

    expect(mockCredentialRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockCredentialRepository.findOne).toHaveBeenCalledWith(command.username);
  });

  // Test Scenario: Should call the save method on the repository with the newly created credential
  it('should call the save method on the repository with the newly created credential', async () => {
    const command = new CreateCredentialCommand('userforsavecheck', 'passforsavecheck');
    const expectedSavedId = 'mock-saved-id-4';
    const mockCreatedCredential: Credentials = {
      id: expectedSavedId,
      username: command.username,
      password: 'hashed_passforsavecheck',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockCredentialRepository.findOne.mockResolvedValue(null); // Ensure findOne returns null so save is called
    mockCredentialRepository.save.mockResolvedValue(mockCreatedCredential); // Mock save's return value

    await service.execute(command);

    expect(mockCredentialRepository.save).toHaveBeenCalledTimes(1);
    expect(mockCredentialRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      username: command.username,
      password: expect.any(String), // Password should be hashed
      id: expect.any(String), // ID should be generated by createCredentials or similar
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    }));
  });

  // Test Scenario: Should return the ID of the created credential on successful creation
  it('should return the ID of the created credential on successful creation', async () => {
    const command = new CreateCredentialCommand('idretrievaluser', 'idretrievalpass');
    const expectedReturnedId = 'retrieved-credential-id-5';
    const mockCreatedCredential: Credentials = {
      id: expectedReturnedId,
      username: command.username,
      password: 'hashed_idretrievalpass',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockCredentialRepository.findOne.mockResolvedValue(null);
    mockCredentialRepository.save.mockResolvedValue(mockCreatedCredential);

    const result = await service.execute(command);

    expect(result.isSuccess).toBe(true);
    expect(result.value).toBe(expectedReturnedId);
  });
});
