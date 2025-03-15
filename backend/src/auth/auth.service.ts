import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //validate user credentials for LocalStrategy
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // sign Up - Create a new user
  async signUp(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);

    //get payload
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    //get token
    const token = this.jwtService.sign(payload);

    return {
      message: 'User registered successfully',
      access_token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  // sign In - Authenticate user and return JWT
  async signIn(user: any) {
    // generate JWT Token
    const payload = { sub: user._id.toString(), email: user.email, role: user.role };
    return {
      user:payload,
      access_token: this.jwtService.sign(payload),

    };
  }
}
