import { FastifyInstance } from "fastify"
import { Routes } from "@api/config/api-routes"
import { RegistrationRequestType } from "@api/dtos/request/registrationRequest"
import { authPort, AuthPort } from "@api/ports/authPort"
import { InternalServerException } from "@api/exceptions/internalServerException"
import { LoginRequestType } from "@api/dtos/request/loginRequest"
import { BadRequestException } from "@api/exceptions/badRequestException"
import { generateToken } from "@libs/auth/jwtUtils"
import { mapTokenPayload } from "@api/mappers/authRoutesMappers"

export const createAuthRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: RegistrationRequestType }>(
    Routes.REGISTRATION.BASE,
    {
      schema: {
        body: Routes.REGISTRATION.REQUEST,
        response: Routes.REGISTRATION.RESPONSE
      }
    },
    async (req, res) => {
      const { body } = req
      const { username, password, role } = body
      const port = req.diScope.resolve<AuthPort>(authPort)
      const result = await port.RegisterUser(username, password, role)
      if (result.isErr()) {
        throw new InternalServerException(result.unwrapErr())
      }
      return res.code(201).send()
    }
  )

  fastify.post<{ Body: LoginRequestType }>(
    Routes.LOGIN.BASE,
    {
      schema: {
        body: Routes.LOGIN.REQUEST,
        response: Routes.LOGIN.RESPONSE
      }
    },
    async (req, res) => {
      const { body } = req
      const { username, password } = body
      const port = req.diScope.resolve<AuthPort>(authPort)
      const result = await port.LoginUser(username, password)
      if (result.isErr()) {
        throw new BadRequestException(result.unwrapErr())
      }
      const tokenPayload = mapTokenPayload(result.unwrap())
      res.status(200).send({ access_token: generateToken(tokenPayload) })
    }
  )
}
