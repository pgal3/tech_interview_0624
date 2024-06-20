import { PrismaClient } from "@prisma/client"
import { AuthPort } from "@api/ports/authPort"
import { UserEntity } from "src/domain/entities/userEntity"
import { UserRole } from "src/domain/enums/userRoleEnum"
import { LoginFailedError } from "src/domain/errors/loginFailedError"
import { UserNotFoundError } from "src/domain/errors/userNotFoundError"
import { generateSalt, hashPassword, checkPassword } from "@libs/auth/pwdUtils"
import { Result, Err } from "oxide.ts"
import { AuthAdapterErrorHandler } from "./handlers/authAdapterErrorHandler"
import { AuthAdapterSuccessHandler } from "./handlers/authAdapterSuccessHandler"
import { isUserLoginQueryResult } from "./prisma/guards/typeGuards"

export class AuthPgAdapter implements AuthPort {
  constructor(private readonly db: PrismaClient) { }

  async RegisterUser(username: string, password: string, role: UserRole): Promise<Result<UserEntity, Error>> {
    try {
      const salt = generateSalt()
      const hashedPassword = hashPassword(password, salt)
      const result = await this.db.users.create({
        data: {
          username,
          UserAuth: {
            create: {
              hash: hashedPassword,
              salt,
              role
            }
          }
        }
      })
      return AuthAdapterSuccessHandler.handleRegistrationResult(result, role)
    } catch (error) {
      return AuthAdapterErrorHandler.handleError(error)
    }
  }

  async LoginUser(username: string, password: string): Promise<Result<UserEntity, Error>> {
    try {
      const userInfo = await this.db.users.findUnique({
        select: {
          id: true,
          UserAuth: true
        },
        where: {
          username
        }
      })
      if (!isUserLoginQueryResult(userInfo)) {
        return Err(new UserNotFoundError())
      }
      const { UserAuth } = userInfo
      const { salt, hash } = UserAuth
      const isValidPassword = checkPassword(password, salt, hash)
      if (!isValidPassword) {
        return Err(new LoginFailedError())
      }
      return AuthAdapterSuccessHandler.handleLoginResult(userInfo)
    } catch (error) {
      return AuthAdapterErrorHandler.handleError(error)
    }
  }

  dispose(): void { }
}
