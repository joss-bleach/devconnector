import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  school: string;

  @IsString()
  qualification: string;

  @IsString()
  location: string;

  @IsString()
  about: string;

  @IsDate()
  @Transform(({ obj }) => new Date(obj.from))
  from: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ obj }) => (obj.to ? new Date(obj.to) : null))
  to: Date;
}
