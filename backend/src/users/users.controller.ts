import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Users') //  all endpoints under "Users" in Swagger
@ApiBearerAuth() // adds "Authorize" button for JWT authentication in Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @swagger Create User
   * Allows an admin or system to create a new user.
   */
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @Post()
  // create user
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * @swagger Get Authenticated User Profile
   * Retrieves the profile of the currently authenticated user.
   * Requires a valid JWT token.
   */
  @ApiOperation({ summary: 'Get Authenticated User Profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  //guard to protect endpoint
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  //get profile
  async getProfile(@Request() req) {
    console.log('am i here');
    console.log(req.user.userId);
    return this.usersService.findUserById(req.user.userId);
  }

  /**
   * @swagger Get User by ID
   * Retrieves user details by their unique identifier.
   * Requires authentication.
   */
  @ApiOperation({ summary: 'Get User by ID' })
  @ApiResponse({ status: 200, description: 'User details retrieved' })
  @ApiResponse({ status: 404, description: 'User not found' })
  //guard to protect endpoint
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id' })
  @Get(':id')
  //get profile by user
  async findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }
}
