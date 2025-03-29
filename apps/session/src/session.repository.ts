import { AbstractRepository } from '@app/common'
import { Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SessionDocument } from './models/session.schema'

export class SessionRepository extends AbstractRepository<SessionDocument> {
    protected readonly logger = new Logger(SessionRepository.name)

    constructor(
        @InjectModel(SessionDocument.name)
        reservationModel: Model<SessionDocument>,
    ) {
        super(reservationModel)
    }
}
