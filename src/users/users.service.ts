import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { PatchUserDto } from './dto/patch-user.dto';
import { hashPassword } from 'src/utils/bycript.util';
import { UserStatus } from './user.consts';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existsUser = await this.userModel.findOne({
      email: createUserDto.email,
      status: {
        $ne: UserStatus.DELETED,
      },
    });
    if (existsUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    createUserDto = {
      ...createUserDto,
      password: await hashPassword(createUserDto.password),
    };
    const newUser = new this.userModel(createUserDto);
    await newUser.save();
    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find({ status: UserStatus.ACTIVE });
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({
      _id: id,
      status: UserStatus.ACTIVE,
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existsUser = await this.userModel.findOne({
      _id: id,
      status: {
        $ne: UserStatus.DELETED,
      },
    });
    if (!existsUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const emailUser = await this.userModel.findOne({
      email: updateUserDto.email,
      status: {
        $ne: UserStatus.DELETED,
      },
    });
    if (emailUser)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true },
    );
    return updatedUser;
  }

  async patch(id: string, updateUserDto: PatchUserDto): Promise<User> {
    const existsUser = await this.userModel.findOne({
      _id: id,
      status: UserStatus.ACTIVE,
    });
    if (!existsUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const emailUser = await this.userModel.findOne({
      email: updateUserDto.email,
      status: {
        $ne: UserStatus.DELETED,
      },
    });
    if (emailUser)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true },
    );
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const deletedUser = await this.userModel.findOneAndUpdate(
      {
        _id: id,
        status: UserStatus.ACTIVE,
      },
      {
        $set: {
          status: UserStatus.DELETED,
        },
      },
    );
    if (!deletedUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
