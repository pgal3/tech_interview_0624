import { UserEntity } from "@domain/entities/userEntity"
import { Ok } from "oxide.ts"
import { UserQueryResult } from "../prisma/types/userQueryResult.type"
import { UserUpdateResult } from "../prisma/types/userUpdateResult.type"
import { UserRoleMapper } from "../mappers/userRoleMapper"

export class DbUserAdapterSuccessHandler {
  static handleUserQueryResult(result: UserQueryResult): Ok<UserEntity> {
    const { id, username, role, email, picture} = result
    return Ok(
      UserEntity.from(id, {
        username,
        role: UserRoleMapper.toUserRole(role),
        email: email ?? undefined,
        picture: picture ?? undefined
      })
    )
  }

  static handleUserUpdateResult(result: UserUpdateResult): Ok<UserEntity> {
    const { id, username, role, email, picture} = result
    return Ok(
      UserEntity.from(id, {
        username,
        role: UserRoleMapper.toUserRole(role),
        email: email ?? undefined,
        picture: picture ?? undefined
      })
    )
  }

  static handleMultipleUserQueryResult(result: UserQueryResult[]): Ok<UserEntity[]> {
    const entities = result.map(user => UserEntity.from(user.id, {
      username: user.username,
      role: UserRoleMapper.toUserRole(user.role),
      email: user.email ?? undefined,
      picture: user.picture ?? undefined
    }))
    return Ok(entities)
  }
}
