import { Result } from "oxide.ts"

export const notificationPort = Symbol.for("notificationPort")

export interface NotificationPort {
	send<T>(receiver: string, payload: T): Promise<Result<boolean, Error>>
}
