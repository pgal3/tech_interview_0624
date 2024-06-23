import { UserRole } from "@domain/enums/userRoleEnum"

export type Consumer = {
	uid: string
	username: string
	role: UserRole
}
