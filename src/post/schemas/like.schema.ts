import { Schema, Prop } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { Types, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Like {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user!: Types.ObjectId;
}
