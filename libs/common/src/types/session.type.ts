import { Message } from './message.type'

export type Session = {
    sessionId: string
    messages: Message[]
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}
