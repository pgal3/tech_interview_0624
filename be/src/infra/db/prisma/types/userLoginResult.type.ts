export type UserLoginResult = {
	id: string
	username: string
	role: string
	UserAuth: {
		hash: string
		salt: string
	}
}
