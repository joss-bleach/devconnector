import { Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { CreateEducationDto } from './dtos/create-eduction.dto';
import { CreateWorkDto } from './dtos/create-work.dto';
import { Education } from './schemas/education.schema';
import { Work } from './schemas/work.schema';

export interface WorkData {
  type: 'work';
  body?: CreateWorkDto;
  id?: string;
}

export interface EducationData {
  type: 'education';
  body?: CreateEducationDto;
  id?: string;
}

export interface DisplayProfile {
  _id: Types.ObjectId;
  user: User | Types.ObjectId;
  company: string;
  jobRole: string;
  lookingForWork: boolean;
  portfolioUrl?: string;
  location?: string;
  about: string;
  skills: string[];
  twitter?: string;
  linkedin?: string;
  github?: string;
  education?: Education[];
  work?: Work[];
}
