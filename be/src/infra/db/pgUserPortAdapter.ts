import type { UserPort } from "@api/ports/userPort"
import { UserEntity } from "@domain/entities/userEntity"
import { UserNotFoundError } from "@domain/errors/userNotFoundError"
import { PrismaClient } from "@prisma/client"
import { Err, Ok, Result } from "oxide.ts"
import { DbUserAdapterSuccessHandler } from "./handlers/dbUserAdapterSuccessHandler"
import { isUserQueryResult } from "./prisma/guards/typeGuards"
import { DbAdapterErrorHandler } from "./handlers/dbAdapterErrorHandler"
import { UpdatableUserInfo } from "@domain/value-objects/updatableUserInfo"

export class PgUserPortAdapter implements UserPort {
    protected readonly db: PrismaClient
  constructor({ db }: { db: PrismaClient }) {
    this.db = db
  }

  async GetUser(userId: string): Promise<Result<UserEntity, Error>> {
    try {
        const user = await this.db.users.findUnique({
            select: {
                id: true,
                username: true,
                role: true,
                email: true,
                picture: true,
            },
            where: {
                id: userId
            }
        })
        if(!isUserQueryResult(user)){
            return Err(new UserNotFoundError())
        }
        return DbUserAdapterSuccessHandler.handleUserQueryResult(user)
    } catch (error) {
        return DbAdapterErrorHandler.handleError(error)
    }
  }

  async GetAllUsers(page: number, limit: number): Promise<Result<UserEntity[], Error>> {
      try {
        const users = await this.db.users.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                UserAuth: true,
                picture: true,
            },
            skip: page*limit,
            take: limit
        })
        const validUsers = users.filter(u => isUserQueryResult(u))
        return DbUserAdapterSuccessHandler.handleMultipleUserQueryResult(validUsers)
      } catch (error) {
        return DbAdapterErrorHandler.handleError(error)
      }
  }

  async UpdateUser(userId: string, info: UpdatableUserInfo): Promise<Result<UserEntity, Error>> {
      try {
        const { username: newUsername, email: newEmail, picture: newPicture} = info
        const updatedUser = await this.db.users.update({
            data: {
                ...(newUsername ? { username: newUsername} : {}),
                ...(newEmail ? {email: newEmail} : {}),
                ...(newPicture ? {picture: newPicture} : {}),
            },
            where: {
                id: userId
            }
        })
        return DbUserAdapterSuccessHandler.handleUserUpdateResult(updatedUser)
      } catch (error) {
        return DbAdapterErrorHandler.handleError(error)
      }
  }

  async DeleteUser(userId: string): Promise<Result<boolean, Error>> {
      try {
        await this.db.users.delete({
            where: {
                id: userId
            }
        })
        return Ok(true)
      } catch (error) {
        return DbAdapterErrorHandler.handleError(error)
      }
  }

  dispose(): void { }
}
