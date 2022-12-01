import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class Work {
  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  jobRole: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  from: Date;

  @Prop()
  to: Date | null;
}
