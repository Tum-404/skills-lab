import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UUID } from 'crypto';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = { email: 'johndoe', name: 'John Doe' };
    const user = await service.create(createUserDto);
    expect(user).toHaveProperty('id');
    expect(user.email).toBe(createUserDto.email);
    expect(user.name).toBe(createUserDto.name);
  });
  
  it('should retrieve all users', async () => {
    const users = await service.findAll();
    expect(Array.isArray(users)).toBe(true);
  });

  it('should retrieve a user by id', async () => {
    const createUserDto = { email: 'janedoe', name: 'Jane Doe' };
    const newUser = await service.create(createUserDto);
    const user = await service.findOne(newUser.id as UUID);
    expect(user).toBeDefined();
    expect(user?.id).toBe(newUser.id);
  });
});
