import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { async } from 'rxjs';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { DisplayProfile, EducationData, WorkData } from './profile.interface';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  findProfileById = async (id: string): Promise<DisplayProfile | null> => {
    return await (
      await this.profileModel.findById(id)
    ).populate('user', ['name', 'email', 'profileImage']);
  };

  findProfileByUserId = async (
    userId: string,
  ): Promise<DisplayProfile | null> => {
    return await this.profileModel
      .findOne({ user: new Types.ObjectId(userId) })
      .populate('user', ['name', 'email', 'profileImage']);
  };

  createProfile = async (
    userId: string,
    createProfileDto: CreateProfileDto,
  ): Promise<DisplayProfile | null> => {
    const profileAlreadyExists = await this.findProfileByUserId(userId);
    if (profileAlreadyExists) {
      throw new ConflictException('A profile already exists for this user.');
    }

    const newProfileData = { ...createProfileDto, user: userId };
    const newProfile = await this.profileModel.create(newProfileData);
    return await newProfile.save();
  };

  addWorkOrEducation = async (
    userId: string,
    data: EducationData | WorkData,
  ): Promise<DisplayProfile | null> => {
    const { type, body } = data;
    const updateEducationAndWork = await this.profileModel.findOneAndUpdate(
      { user: userId },
      { $push: { [`${type}`]: body } },
      { new: true },
    );
    if (!updateEducationAndWork) {
      throw new NotFoundException(
        'No profile found to add education or work experience to.',
      );
    }
    return await updateEducationAndWork;
  };
}
