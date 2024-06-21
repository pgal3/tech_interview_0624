import { UserEntity } from "@domain/entities/userEntity"
import { Ok } from "oxide.ts"
import { RegisterUserResult } from "../prisma/types/registerUserResult.type"
import { UserLoginResult } from "../prisma/types/userLoginResult.type"
import { UserRoleMapper } from "../mappers/userRoleMapper"

export class DbAuthAdapterSuccessHandler {
  static handleRegisterUserResult(
    result: RegisterUserResult
  ): Ok<UserEntity> {
    const { id, username, role, email, picture } = result
    return Ok(
      UserEntity.from(id, {
        username,
        role: UserRoleMapper.toUserRole(role),
        email: email ?? undefined,
        picture: picture ?? undefined
      })
    )
  }

  static handleLoginResult(result: UserLoginResult): Ok<UserEntity> {
    const { id, role, UserAuth } = result
    const { username } = UserAuth
    return Ok(
      UserEntity.from(id, {
        username,
        role: UserRoleMapper.toUserRole(role)
      })
    )
  }
}
