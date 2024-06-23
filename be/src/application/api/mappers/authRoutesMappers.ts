import { UserEntity } from "@domain/entities/userEntity"
import { Consumer } from "@domain/types/consumer.type"

export const mapTokenPayload = (user: UserEntity): Consumer => {
	const { id, username, role } = user
	return {
		uid: id,
		username,
		role
	}
}
