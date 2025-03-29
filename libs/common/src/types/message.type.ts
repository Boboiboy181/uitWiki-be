export type Message = {
    messageId: string
    content: string
    sender: 'user' | 'bot'
    timestamp: number
}
