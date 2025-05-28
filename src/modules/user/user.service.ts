import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.mat_khau, salt);

    const newUser = await this.userModel.create({
      ...createUserDto,
      mat_khau: hashedPassword,
    });
    return newUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updated = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    if (!updated) throw new NotFoundException(`User not found`);
    return updated;
  }

  async deleteUser(id: string): Promise<any> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`User not found`);
    return {
      message: 'User deleted successfully',
      statusCode: 200,
    };
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ ten_dang_nhap: username });
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }
}
