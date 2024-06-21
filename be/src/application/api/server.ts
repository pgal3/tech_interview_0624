import { fastify, FastifyInstance } from "fastify"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { diContainer, fastifyAwilixPlugin } from "@fastify/awilix"
import { PrismaClient } from "@prisma/client"
import { asClass, asFunction, Lifetime } from "awilix"
import { fastifyRequestContext } from "@fastify/request-context"
import { AuthPgAdapter } from "src/infra/db/authPgAdapter"
import { createAuthRoutes } from "./routes/authRoutes"
import { authPort } from "./ports/authPort"
import { userPort } from "./ports/userPort"
import { UserPgAdapter } from "@infra/db/userPgAdapter"
import { createUsersRoutes } from "./routes/usersRoutes"

export function StartServer(){
  const server: FastifyInstance = fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>()

  server.register(fastifyRequestContext)
  server.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
    strictBooleanEnforced: true
  })
  
  diContainer.register({
    db: asFunction(() => new PrismaClient(), {
      lifetime: Lifetime.SINGLETON,
      dispose: async db => await db.$disconnect()
    }),
    [authPort]: asClass(AuthPgAdapter, {
      lifetime: Lifetime.SINGLETON,
      dispose: module => module.dispose()
    }),
    [userPort]: asClass(UserPgAdapter, {
      lifetime: Lifetime.SINGLETON,
      dispose: module => module.dispose()
    })
  })
  
  createAuthRoutes(server)
  createUsersRoutes(server)
  
  server.listen({ port: Number(process.env["SERVER_PORT"]) || 3000 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}
