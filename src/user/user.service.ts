import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { UserDetails } from './user-details.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails = (user: UserDocument): UserDetails => {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    };
  };

  // Find a user by their email address
  findUserByEmail = async (
    email: string,
  ): Promise<UserDetails | NotFoundException> => {
    let user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('No user found with this email address');
    }
    return this._getUserDetails(user);
  };

  // Find a user by their ID
  findUserById = async (
    id: string,
  ): Promise<UserDetails | NotFoundException> => {
    let user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('No user found with this ID');
    }
    return this._getUserDetails(user);
  };

  // Create a new user
  createUser = async (
    data: CreateUserDto,
  ): Promise<UserDocument | InternalServerErrorException> => {
    let profileImage = `https://avatars.dicebear.com/api/pixel-art/${data.name.replace(
      /\s/g,
      '',
    )}.svg`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUserData = { ...data, profileImage };
    newUserData.password = hashedPassword;
    const newUser = await this.userModel.create(newUserData);
    if (!newUser) {
      throw new InternalServerErrorException();
    }
    return newUser.save();
  };
}
