import { UserEntity } from "@domain/entities/userEntity"
import { UserRole } from "@domain/enums/userRoleEnum"
import { UserLoginQueryResult } from "@infra/db/prisma/types/userLoginQueryResult.type"
import { UserRegistrationQueryResult } from "@infra/db/prisma/types/userRegistrationQueryResult.type"
import { Ok } from "oxide.ts"

export class AuthAdapterSuccessHandler {
  static handleRegistrationResult(
    result: UserRegistrationQueryResult,
    role: UserRole
  ): Ok<UserEntity> {
    const { id, username, email, picture } = result
    return Ok(
      UserEntity.from(id, {
        username,
        role,
        email: email ?? undefined,
        picture: picture ?? undefined
      })
    )
  }

  static handleLoginResult(result: UserLoginQueryResult): Ok<UserEntity> {
    const { id, UserAuth } = result
    const { username, role } = UserAuth
    return Ok(
      UserEntity.from(id, {
        username,
        role
      })
    )
  }
}
