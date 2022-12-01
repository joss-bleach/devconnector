import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWorkDto {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  jobRole: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ obj }) => new Date(obj.from))
  from: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ obj }) => (obj.to ? new Date(obj.to) : null))
  to: Date;
}
