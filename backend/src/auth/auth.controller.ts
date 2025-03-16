import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication') // all endpoints under "Authentication" in Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @swagger User Registration
   * Allows a new user to register by providing an email, name, and password.
   */
  @ApiOperation({ summary: 'User Registration' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @Post('register')
  // register user
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }

  /**
   * @swagger User Login
   * Authenticates a user and returns a JWT token.
   */
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  //guard to protect endpoint
  @ApiBody({ type: LoginDto }) //to pass login dto to swagger
  //ensures that only users with valid credentials can proceed with the login method
  @UseGuards(LocalAuthGuard)
  @Post('login')
  // login user
  async login(@Request() req) {
    return this.authService.signIn(req.user);
  }
}
