import { fastify, FastifyInstance } from "fastify"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { diContainer, fastifyAwilixPlugin } from "@fastify/awilix"
import { PrismaClient } from "@prisma/client"
import { asClass, asFunction, Lifetime } from "awilix"
import { authPlugin } from "./plugins/authPlugin"
import { fastifyRequestContext } from "@fastify/request-context"
import { AuthPgAdapter } from "src/infra/db/authPgAdapter"

export function StartServer(){
  const server: FastifyInstance = fastify().withTypeProvider<TypeBoxTypeProvider>()

  server.register(fastifyRequestContext)
  server.register(authPlugin)
  server.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
    strictBooleanEnforced: true
  })
  
  diContainer.register({
    db: asFunction(() => new PrismaClient(), {
      dispose: async (db) => await db.$disconnect()
    }),
    authPort: asClass(AuthPgAdapter, {
      lifetime: Lifetime.SINGLETON,
      dispose: (module) => module.dispose()
    })
  })
  
  server.get("/ping", async (_request, _reply) => {
    return "pong\n"
  })
  
  server.listen({ port: Number(process.env["SERVER_PORT"]) || 3000 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}
