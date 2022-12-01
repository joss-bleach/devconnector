import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Work } from './work.schema';
import { Education } from './education.schema';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user!: Types.ObjectId;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  jobRole: string;

  @Prop({ required: true, default: false })
  lookingForWork: boolean;

  @Prop()
  portfolioUrl: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  about: string;

  @Prop([String])
  skills: string[];

  @Prop()
  twitter: string;

  @Prop()
  linkedin: string;

  @Prop()
  github: string;

  @Prop([Education])
  education: Education[];

  @Prop([Work])
  work: Work[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
