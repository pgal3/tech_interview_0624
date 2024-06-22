import { PrismaClient } from "@prisma/client"
import { AuthPort } from "@api/ports/authPort"
import { UserEntity } from "@domain/entities/userEntity"
import { UserRole } from "@domain/enums/userRoleEnum"
import { LoginFailedError } from "@domain/errors/loginFailedError"
import { UserNotFoundError } from "@domain/errors/userNotFoundError"
import { generateSalt, hashPassword, checkPassword } from "@libs/auth/pwdUtils"
import { Result, Err } from "oxide.ts"
import { DbAdapterErrorHandler } from "./handlers/dbAdapterErrorHandler"
import { isUserLoginQueryResult } from "./prisma/guards/typeGuards"
import { DbAuthAdapterSuccessHandler } from "./handlers/dbAuthAdapterSuccessHandler"

export class PgAuthPortAdapter implements AuthPort {
  protected readonly db: PrismaClient
  constructor({ db }: { db: PrismaClient }) {
    this.db = db
  }

  async RegisterUser(username: string, password: string, role: UserRole): Promise<Result<UserEntity, Error>> {
    try {
      const salt = generateSalt()
      const hashedPassword = hashPassword(password, salt)
      const result = await this.db.users.create({
        data: {
          username,
          role,
          UserAuth: {
            create: {
              hash: hashedPassword,
              salt
            }
          }
        }
      })
      return DbAuthAdapterSuccessHandler.handleRegisterUserResult(result)
    } catch (error) {
      return DbAdapterErrorHandler.handleError(error)
    }
  }

  async LoginUser(username: string, password: string): Promise<Result<UserEntity, Error>> {
    try {
      const userInfo = await this.db.users.findUnique({
        select: {
          id: true,
          role: true,
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
      return DbAuthAdapterSuccessHandler.handleLoginResult(userInfo)
    } catch (error) {
      return DbAdapterErrorHandler.handleError(error)
    }
  }

  dispose(): void { }
}
