import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class Work {
  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  jobRole: string;

  @Prop({ required: true })
  from: Date;

  @Prop()
  to: Date | null;

  @Prop({ required: true })
  description: string;
}
