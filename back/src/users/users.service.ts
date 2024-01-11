import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserDocument, UserSchema } from './schemas/user.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
    const { password } = createUserDto;

    const passwordHash = await hash(password, 16);

    const user: UserDto = { ...createUserDto, password: passwordHash };

    const createdUser = await this.userModel.create<UserDocument>(user);
    await createdUser.save();
    return createdUser;
  }

  async findAll(): Promise<Array<User>> {
    return await this.userModel.find<UserDocument>().exec();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne<UserDocument>({ email: email }).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne<UserDocument>({ email: email }).exec();
  }

  async update(email: string, updateUserDto: UserDto): Promise<boolean> {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ email: email }, updateUserDto)
      .exec();
    if (!updatedUser) return false;
    await updatedUser.save();
    return true;
  }

  async remove(email: string): Promise<boolean> {
    const userTobeDeleted = await this.userModel
      .findOneAndDelete({ email: email })
      .exec();
    if (!userTobeDeleted) return false;
    return true;
  }
}
