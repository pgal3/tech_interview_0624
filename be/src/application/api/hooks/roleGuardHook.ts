import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify"
import { ForbiddenException } from "@api/exceptions/forbiddenException"
import { UnauthorizedException } from "@api/exceptions/unauthorizedException"
import { requestContext } from "@fastify/request-context"
import { UserRole } from "@domain/enums/userRoleEnum"

export const roleGuardHook =
  (allowedRoles: UserRole[]) => (_req: FastifyRequest, _reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
    const consumer = requestContext.get("consumer")
    if (!consumer) {
      throw new UnauthorizedException()
    }
    const { role } = consumer
    if (!allowedRoles.includes(role)) {
      throw new ForbiddenException()
    }
    done()
  }
