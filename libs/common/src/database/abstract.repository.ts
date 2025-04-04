import { Logger, NotFoundException } from '@nestjs/common'
import { ClientSession, FilterQuery, Model, Types, UpdateQuery } from 'mongoose'
import { AbstractDocument } from './abstract.schema'

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger

    constructor(protected readonly model: Model<TDocument>) {}

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        })

        return (await createdDocument.save()).toJSON() as unknown as TDocument
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery).lean<TDocument>(true)

        if (!document) {
            this.logger.warn('document was not found with FilterQuery: ' + filterQuery)
            throw new NotFoundException('Document not found')
        }

        return document
    }

    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
        const document = await this.model
            .findOneAndUpdate(filterQuery, update, {
                new: true,
            })
            .lean<TDocument>(true)

        if (!document) {
            this.logger.warn('document was not found with FilterQuery: ' + filterQuery)
            throw new NotFoundException('Document not found')
        }

        return document
    }

    async findAll(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        return this.model.find(filterQuery).lean<TDocument[]>(true)
    }

    async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOneAndDelete(filterQuery).lean<TDocument>(true)

        if (!document) {
            this.logger.warn('document was not found with FilterQuery: ' + filterQuery)
            throw new NotFoundException('Document not found')
        }

        return document
    }

    async startTransaction(): Promise<ClientSession> {
        return this.model.startSession()
    }

    async commitTransaction(session: ClientSession): Promise<void> {
        return session.commitTransaction()
    }

    async rollbackTransaction(session: ClientSession): Promise<void> {
        return session.abortTransaction()
    }
}
