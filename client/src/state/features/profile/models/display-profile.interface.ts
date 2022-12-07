import { DisplayUser } from '../../user/display-user.interface';
import { Education } from './education.interface';
import { Work } from './work.interface';

export interface DisplayProfile {
  id: string;
  user: DisplayUser;
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
