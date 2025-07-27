import { CreateCacheDto, UpdateCacheDto } from '@app/common'
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Sse } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ChatbotService } from './chatbot.service'
import { SendMessageDto } from './dtos/send-message.dto'

@Controller('chatbot')
export class ChatbotController {
    private chatbotClient = this.chatbotService.getClient()

    constructor(private readonly chatbotService: ChatbotService) {}

    // @Post('/send_message')
    // @HttpCode(200)
    // async sendMessage(@Body() sendMessageDto: SendMessageDto): Promise<Message> {
    //     return await this.chatbotService.sendMessage(sendMessageDto)
    // }

    @Sse('send_message_stream')
    sendMessageStream(@Query() query: SendMessageDto): Promise<Observable<MessageEvent>> {
        return this.chatbotService.getMessageStream(query)
    }

    @Get('/redis')
    @HttpCode(200)
    findAll() {
        return this.chatbotClient.send('findAllCachedKeys', {})
    }

    @Get('/redis/:id')
    findOne(@Param('id') _id: string) {
        return this.chatbotClient.send('findOneCachedKey', _id)
    }

    @Post('/redis')
    create(@Body() createCacheDto: CreateCacheDto) {
        return this.chatbotClient.send('createCachedKey', createCacheDto)
    }

    @Patch('/redis/:id')
    update(@Param('id') id: string, @Body() updateCacheDto: UpdateCacheDto) {
        return this.chatbotClient.send('updateCachedKey', {
            _id: id,
            updateCacheDto,
        })
    }

    @Delete('/redis/:_id')
    remove(@Param('_id') _id: string) {
        return this.chatbotClient.send('removeCachedKey', _id)
    }
}
