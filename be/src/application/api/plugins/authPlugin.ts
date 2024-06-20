import { UnauthorizedException } from "@api/exceptions/unauthorizedException"
import { Consumer } from "@domain/types/consumer.type"
import { getPayload } from "@libs/auth/jwtUtils"
import fastifyPlugin from "fastify-plugin"

export const authPlugin = fastifyPlugin(
  (instance, _options, done) => {
    instance.addHook("onRequest", (request, reply) => {
      const { headers } = request
      const { authorization } = headers
      if (!authorization) {
        return done()
      }
      const consumer = getPayload<Consumer>(authorization.split("Bearer")[1])
      if (consumer.isErr()) {
        return reply.send(new UnauthorizedException(consumer.unwrapErr()))
      }
      request.requestContext.set("consumer", consumer.unwrap())
      done()
    })
  },
  {
    name: "authPlugin"
  }
)
