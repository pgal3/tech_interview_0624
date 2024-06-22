import { Result } from "oxide.ts"
import { UserRole } from "@domain/enums/userRoleEnum"
import { AwilixRegistrable } from "@libs/common/interfaces/awilix-registrable.interface"
import { UserEntity } from "@domain/entities/userEntity"

export const authPort = Symbol.for("authPort")
export interface AuthPort extends AwilixRegistrable {
  RegisterUser(
    username: string,
    password: string,
    role: UserRole
  ): Promise<Result<UserEntity, Error>>
  LoginUser(username: string, password: string): Promise<Result<UserEntity, Error>>
}
