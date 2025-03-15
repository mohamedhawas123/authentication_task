import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn().mockReturnValue({ exec: jest.fn() }),
            findById: jest.fn().mockReturnValue({ exec: jest.fn() }),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user by email', async () => {
    // mock user data to simulate a real user object
    const mockUser = {
      _id: '123',
      email: 'test@example.com',
      name: 'mohamed saif',
      password: 'hashedPassword',
      role: 'user',
    };
    // mock the `findUserByEmail` method of UsersService to return the mockUser

    jest.spyOn(userModel, 'findOne').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(mockUser),
    } as any);

    const result = await service.findUserByEmail('test@example.com');
    expect(result).toEqual(mockUser);
  });
});
