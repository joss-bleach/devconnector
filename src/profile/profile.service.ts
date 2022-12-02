import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  findProfileByUserId = async (userId: string) => {
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

  updateProfileByUserId = async (
    userId: string,
    attributes: Partial<ProfileDocument>,
  ): Promise<DisplayProfile | null> => {
    const profile = await this.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('No profile found for this user.');
    }
    Object.assign(profile, attributes);
    return await profile.save();
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
    return updateEducationAndWork;
  };

  removeWorkOrEducation = async (
    userId: string,
    data: EducationData | WorkData,
  ): Promise<DisplayProfile | null> => {
    const { type, id } = data;
    if (!id) {
      throw new NotFoundException(
        'No id found to remove education or work experience from.',
      );
    }

    const deleteEducationAndWork = await this.profileModel.findOneAndUpdate(
      { user: userId },
      { $pull: { [`${type}`]: { _id: id } } },
      { new: true },
    );

    return deleteEducationAndWork;
  };

  updateWorkOrEducation = async (
    userId: string,
    data: EducationData | WorkData,
  ): Promise<DisplayProfile | null> => {
    const { type, id, body } = data;
    if (!id || !body) {
      throw new NotFoundException(
        'No id found to remove education or work experience from.',
      );
    }

    let updatedItems = {};

    for (let field in body) {
      updatedItems[`${type}.$.${field}`] = body[field];
    }

    const updateEducationAndWork = await this.profileModel.findOneAndUpdate(
      {
        user: userId,
        [`${type}._id`]: id,
      },
      { $set: updatedItems },
      { new: true, upsert: true },
    );
    return updateEducationAndWork;
  };

  changeLookingForWork = async (
    userId: string,
  ): Promise<DisplayProfile | null> => {
    let userProfile = await this.findProfileByUserId(userId);
    if (!userProfile) {
      throw new NotFoundException('No profile found for this user.');
    }
    userProfile.lookingForWork = !userProfile.lookingForWork;
    return await userProfile.save();
  };
}
