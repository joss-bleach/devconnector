import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  jobRole: string;

  @IsBoolean()
  lookingForWork: boolean;

  @IsOptional()
  @IsUrl()
  portfolioUrl: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  about: string;

  @IsNotEmpty()
  skills: string[];

  @IsOptional()
  @IsString()
  twitter: string;

  @IsOptional()
  @IsString()
  linkedin: string;

  @IsOptional()
  @IsString()
  github: string;
}
