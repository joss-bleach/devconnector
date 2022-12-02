import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  company: string;

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

  @IsString()
  about: string;

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
