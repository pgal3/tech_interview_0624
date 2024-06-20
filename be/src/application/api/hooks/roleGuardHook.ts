import { FastifyReply, FastifyRequest } from "fastify"
import { ForbiddenException } from "@api/exceptions/forbiddenException"
import { UnauthorizedException } from "@api/exceptions/unauthorizedException"
import { requestContext } from "@fastify/request-context"
import { UserRole } from "src/domain/enums/userRoleEnum"

export const roleGuardHook =
  (allowedRoles: UserRole[]) => (_: FastifyRequest, reply: FastifyReply) => {
    const consumer = requestContext.get("consumer")
    if (!consumer) {
      return reply.send(new UnauthorizedException())
    }
    const { role } = consumer
    if (!allowedRoles.includes(role)) {
      return reply.send(new ForbiddenException())
    }
  }
