import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    //Create a testing module for Auth Controller
    const module: TestingModule = await Test.createTestingModule({
      // Register the controller to be tested
      controllers: [AuthController],
      providers: [
        //Register AuthService as a provider
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findUserByEmail: jest.fn(), // mock findUserByEmail method
            create: jest.fn(), // mock create method
          },
        },
        {
          // mock JwtService to avoid real token generation

          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mocked_token'),
          },
        },
      ],
    }).compile();
    // retrieve instances of the controller and service from the testing module

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    // ensure that the AuthController is properly instantiated

    expect(authController).toBeDefined();
  });
});
