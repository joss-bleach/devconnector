import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWorkDto {
  @IsString()
  company: string;

  @IsString()
  jobRole: string;

  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsDate()
  @Transform(({ obj }) => new Date(obj.from))
  from: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ obj }) => (obj.to ? new Date(obj.to) : null))
  to: Date;
}
