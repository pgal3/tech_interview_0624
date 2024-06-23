import { UserEntity } from "@domain/entities/userEntity"
import { UpdatableUserInfo } from "@domain/value-objects/updatableUserInfo"
import { AwilixRegistrable } from "@libs/common/interfaces/awilix-registrable.interface"
import { Result } from "oxide.ts"

export const userPort = Symbol.for("userPort")
export interface UserPort extends AwilixRegistrable {
	GetUser(userId: string): Promise<Result<UserEntity, Error>>
	GetAllUsers(page: number, limit: number): Promise<Result<UserEntity[], Error>>
	UpdateUser(userId: string, info: UpdatableUserInfo): Promise<Result<UserEntity, Error>>
	DeleteUser(userId: string): Promise<Result<boolean, Error>>
}
