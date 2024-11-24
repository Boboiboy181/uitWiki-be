import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Document extends AbstractDocument {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ required: true })
  size: number;

  @Prop({ type: Object, required: true })
  metadata: Record<string, any>;

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ default: true })
  isActive?: boolean;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
