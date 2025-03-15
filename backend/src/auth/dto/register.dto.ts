import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  //for swagger
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
    required: true,
  })
  //validators
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  //for swagger
  @ApiProperty({
    example: 'mohamed saif',
    description: 'User full name',
    required: true,
  })
  //validators
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;
  //for swagger
  @ApiProperty({
    example: 'Pass@1234',
    description:
      'User password (must be at least 8 characters long, contain one letter, one number, and one special character)',
    required: true,
  })
  //validators
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  @Matches(/[\W_]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
