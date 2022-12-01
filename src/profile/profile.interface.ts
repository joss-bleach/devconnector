import { CreateEducationDto } from './dtos/create-eduction.dto';
import { CreateWorkDto } from './dtos/create-work.dto';

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
