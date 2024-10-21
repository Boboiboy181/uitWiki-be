import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message } from '../types/message.type';

@Schema({ versionKey: false, timestamps: true })
export class SessionDocument extends AbstractDocument {
  @Prop()
  sessionId: string;

  @Prop()
  messages: Message[];

  @Prop()
  isActive: boolean;
}

export const SessionSchema = SchemaFactory.createForClass(SessionDocument);
