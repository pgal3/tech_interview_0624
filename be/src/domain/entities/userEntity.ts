import { UserRole } from "@domain/enums/userRoleEnum"
import { BaseEntity } from "@libs/common/class/base.entity"

export type UserEntityProps = {
  role: UserRole
  username: string
  email?: string
  picture?: string
}

export class UserEntity extends BaseEntity<UserEntityProps> {
  constructor(id: string, props: UserEntityProps) {
    super(id, props)
  }

  static from(id: string, props: UserEntityProps): UserEntity {
    return new UserEntity(id, props)
  }

  get role(): UserRole {
    return this.props.role
  }

  get username(): string {
    return this.props.username
  }

  get email(): string | undefined {
    return this.props.email
  }

  get picture(): string | undefined {
    return this.props.picture
  }
}
