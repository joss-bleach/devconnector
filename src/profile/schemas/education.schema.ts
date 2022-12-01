import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class Education {
  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  qualification: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  from: Date;

  @Prop()
  to: Date | null;
}
