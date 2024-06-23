import { Result } from "oxide.ts"

export const queuePort = Symbol.for("queuePort")

export interface QueuePort {
	send<T>(queue: string, payload: T): Promise<Result<boolean, Error>>
	consume(queue: string, handlingFunction: (payload: string) => void): void
}
