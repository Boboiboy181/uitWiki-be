import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatbotGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
        return data
    }

    sendMessageToClient(clientId: string, message: string) {
        this.server.to(clientId).emit('chatbot_message', message)
    }
}
