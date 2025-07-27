import { CHATBOT_SERVICE, SESSION_SERVICE } from '@app/common'
import { Message } from '@app/common/types'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy } from '@nestjs/microservices'
import axios from 'axios'
import { Observable, firstValueFrom } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
import { SendMessageDto } from './dtos/send-message.dto'

@Injectable()
export class ChatbotService {
    private chatbot_service_url: string

    constructor(
        @Inject(CHATBOT_SERVICE) private readonly chatbotService: ClientProxy,
        @Inject(SESSION_SERVICE) private readonly sessionService: ClientProxy,
        private readonly configService: ConfigService,
    ) {
        this.chatbot_service_url = this.configService.get<string>('CHATBOT_API_URL')
    }

    getClient(): ClientProxy {
        return this.chatbotService
    }

    async sendMessage(sendMessageDto: SendMessageDto): Promise<Message> {
        const { user_question, sessionId, timestamp } = sendMessageDto

        const botResponse: string = await firstValueFrom(this.chatbotService.send('sendMessage', user_question))

        const messages: Message[] = [
            {
                content: user_question,
                sender: 'user',
                timestamp: Number(timestamp),
                messageId: uuidv4(),
            },
            {
                content: botResponse,
                sender: 'bot',
                timestamp: Date.now(),
                messageId: uuidv4(),
            },
        ]

        await this.sessionService.send({ cmd: 'add_message' }, { sessionId, message: messages[0] }).toPromise()
        await this.sessionService.send({ cmd: 'add_message' }, { sessionId, message: messages[1] }).toPromise()

        return messages[1]
    }

    async getMessageStream(sendMessageDto: SendMessageDto): Promise<Observable<MessageEvent>> {
        const { user_question, sessionId, timestamp } = sendMessageDto

        const userMessage: Message = {
            content: user_question,
            sender: 'user',
            timestamp: Number(timestamp),
            messageId: uuidv4(),
        }

        await this.sessionService.send({ cmd: 'add_message' }, { sessionId, message: userMessage }).toPromise()

        let botMessageContent = ''
        const botMessageId = uuidv4()

        return new Observable<MessageEvent>((subscriber) => {
            const fastapiStreamUrl = `http://host.docker.internal:8000/api/v1/chat_bot/send_message`
            axios({
                method: 'post',
                url: fastapiStreamUrl,
                responseType: 'stream',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    user_question: user_question,
                },
            })
                .then((response) => {
                    response.data.on('data', (chunk) => {
                        const message = chunk.toString() as string
                        if (message.includes('[DONE]')) {
                            const botMessage: Message = {
                                content: botMessageContent,
                                sender: 'bot',
                                timestamp: Date.now(),
                                messageId: botMessageId,
                            }

                            this.sessionService
                                .send({ cmd: 'add_message' }, { sessionId, message: botMessage })
                                .toPromise()

                            subscriber.next({ data: message, type: 'end' } as MessageEvent)
                            subscriber.complete()
                            return
                        }
                        botMessageContent += message
                        subscriber.next({ data: message, type: 'message' } as MessageEvent)
                    })

                    response.data.on('end', () => {
                        subscriber.complete()
                    })

                    response.data.on('error', (error) => {
                        subscriber.error(error)
                    })
                })
                .catch((error) => {
                    subscriber.error(error)
                })
        })
    }
}
