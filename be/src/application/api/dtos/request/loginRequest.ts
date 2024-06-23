import { Static, Type } from "@sinclair/typebox"

export const LoginRequest = Type.Object({
	username: Type.String({
		description: "User's unique username",
		examples: ["ammaccabanane___"],
		minLength: 4
	}),
	password: Type.String({ description: "User password", minLength: 4 })
})

export type LoginRequestType = Static<typeof LoginRequest>
