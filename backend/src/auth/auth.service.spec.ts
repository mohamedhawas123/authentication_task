import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    //create a testing module for Auth Service
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          // mock UsersService to prevent real database interaction
          provide: UsersService,
          useValue: {
            findUserByEmail: jest.fn(), // mock method for retrieving a user by email
            create: jest.fn(), //  mock method for creating a new user
          },
        },
        {
          // mock JwtService to avoid real JWT token generation

          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mocked_token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
