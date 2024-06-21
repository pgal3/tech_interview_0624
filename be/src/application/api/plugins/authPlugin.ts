import { UnauthorizedException } from "@api/exceptions/unauthorizedException"
import { Consumer } from "@domain/types/consumer.type"
import { getPayload } from "@libs/auth/jwtUtils"
import fastifyPlugin from "fastify-plugin"

export const authPlugin = fastifyPlugin(
  (instance, _options, done) => {
    instance.addHook("onRequest", (request, _reply, done) => {
      const { headers } = request
      const { authorization } = headers
      if (!authorization) {
        throw new UnauthorizedException()
      }
      const [, token] = authorization.split("Bearer")
      const consumer = getPayload<Consumer>(token)
      if (consumer.isErr()) {
        throw new UnauthorizedException(consumer.unwrapErr())
      }
      request.requestContext.set("consumer", consumer.unwrap())
      done()
    })
    done()
  },
  {
    name: "authPlugin"
  }
)
