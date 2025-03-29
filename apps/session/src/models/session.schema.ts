import { AbstractDocument } from '@app/common'
import { Message } from '@app/common/types'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ versionKey: false, timestamps: true })
export class SessionDocument extends AbstractDocument {
    @Prop()
    sessionId: string

    @Prop()
    messages: Message[]

    @Prop()
    isActive: boolean
}

export const SessionSchema = SchemaFactory.createForClass(SessionDocument)
