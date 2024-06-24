import { UnknownError } from "@domain/errors/unknownError";
import { QueuePort } from "@libs/common/ports/queuePort";
import client from "amqplib";
import { Err, Ok, Result } from "oxide.ts";

export class RabbitMQQueuePortAdapter implements QueuePort {
    protected connection: client.Connection
    protected pubChannel: client.Channel
    protected subChannel: client.Channel

    async send<T>(queue: string, payload: T): Promise<Result<boolean, Error>> {
        try {
            const ch = await this.getPubChannel()
            const preparedPayload = JSON.stringify(payload)
            await ch.assertQueue(queue)
            const sendResult = ch.sendToQueue(queue, Buffer.from(preparedPayload))
            return Ok(sendResult)
        } catch (error) {
            return Err(new UnknownError())
        }
    }

    async consume(queue: string, handlingFunction: (payload: client.ConsumeMessage) => void): Promise<Result<void, Error>> {
        try {
            const ch = await this.getSubChannel()
            await ch.assertQueue(queue)
            await ch.consume(queue, handlingFunction)
        } catch (error) {
            return Err(new UnknownError())
        }
    }

    private async getPubChannel(): Promise<client.Channel> {
        if(!this.pubChannel){
            const conn = await this.getConnection()
            this.pubChannel = await conn.createChannel()
        }
        return this.pubChannel
    }

    private async getSubChannel(): Promise<client.Channel> {
        if(!this.subChannel){
            const conn = await this.getConnection()
            this.subChannel = await conn.createChannel()
        }
        return this.subChannel
    }

    private async getConnection(): Promise<client.Connection> {
        if(!this.connection){
            this.connection = await client.connect(`amqp://${process.env["RABBITMQ_DEFAULT_USER"]}:${process.env["RABBITMQ_DEFAULT_PASS"]}@${process.env["RABBITMQ_URL"]}:${process.env["RABBITMQ_PORT"]}`)
        }
        return this.connection
    }
    
    async dispose(): Promise<void> {
        await this.pubChannel.close()
        await this.subChannel.close()
    }
}