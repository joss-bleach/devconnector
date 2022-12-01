import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsNotEmpty()
  @IsString()
  school: string;

  @IsNotEmpty()
  @IsString()
  qualification: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  about: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ obj }) => new Date(obj.from))
  from: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ obj }) => (obj.to ? new Date(obj.to) : null))
  to: Date;
}
