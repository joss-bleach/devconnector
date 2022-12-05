import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Comment } from './comment.schema';
import { Like } from './like.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user!: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop([Like])
  likes: Like[];

  @Prop([Comment])
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
