import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  //swagger
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
    required: true,
  })
  //validators
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  //swagger
  @ApiProperty({
    example: 'Pass@1234',
    description: 'User password (must be at least 8 characters long)',
    required: true,
  })
  //validators
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
