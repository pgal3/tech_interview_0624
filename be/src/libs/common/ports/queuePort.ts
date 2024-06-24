import { AwilixRegistrable } from "@libs/common/interfaces/awilix-registrable.interface"
import { Result } from "oxide.ts"
import client from 'amqplib'

export const queuePort = Symbol.for("queuePort")

export interface QueuePort extends AwilixRegistrable {
	send<T>(queue: string, payload: T): Promise<Result<boolean, Error>>
	consume(queue: string, handlingFunction: (payload: client.ConsumeMessage) => void): Promise<Result<void, Error>>
}
