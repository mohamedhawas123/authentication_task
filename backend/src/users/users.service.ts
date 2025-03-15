import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    // get email, name,password from dto
    const { email, name, password } = createUserDto;

    //check if email already exist
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new object user and return it
    const newUse = new this.userModel({
      email,
      name,
      password: hashedPassword,
    });
    return newUse.save();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    //return object user by email
    return this.userModel.findOne({ email }).exec();
  }
  async findUserById(id: string): Promise<User | null> {
    //return object user by id

    return this.userModel.findById(id).exec();
  }
}
