import { UnauthorizedException } from "@api/exceptions/unauthorizedException"
import { Consumer } from "@domain/types/consumer.type"
import { getPayload } from "@libs/auth/jwtUtils"
import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from "fastify"

declare module "@fastify/request-context" {
	interface RequestContextData {
		consumer: Consumer
	}
}

export const authHook = (req: FastifyRequest, _reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
	const { headers } = req
	const { authorization } = headers
	if (!authorization) {
		throw new UnauthorizedException()
	}
	const [, token] = authorization.split("Bearer ")
	const consumer = getPayload<Consumer>(token)
	if (consumer.isErr()) {
		throw new UnauthorizedException(consumer.unwrapErr())
	}
	req.requestContext.set("consumer", consumer.unwrap())
	done()
}
