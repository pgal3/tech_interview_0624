import { PostQueryResult } from "../types/postQueryResult.type"
import { UserLoginResult } from "../types/userLoginResult.type"
import { UserQueryResult } from "../types/userQueryResult.type"

export const isUserLoginQueryResult = (res: unknown): res is UserLoginResult => {
	const casted = res as UserLoginResult
	return !!casted && !!casted.id && !!casted.role && !!casted.UserAuth
}

export const isUserQueryResult = (res: unknown): res is UserQueryResult => {
	const casted = res as UserQueryResult
	return !!casted && !!casted.id && !!casted.username
}

export const isPostQueryResult = (res: unknown): res is PostQueryResult => {
	const casted = res as PostQueryResult
	return !!casted && !!casted.authorId && !!casted.title
}
