import { Static, Type } from "@sinclair/typebox"

export const UpdateUserRequest = Type.Object({
	username: Type.Optional(
		Type.String({
			description: "User's unique username",
			examples: ["ammacabanane___"],
			minLength: 4
		})
	),
	email: Type.Optional(
		Type.String({
			description: "User's email",
			examples: ["john@doe.com"],
			format: "email"
		})
	)
})

export type UpdateUserRequestType = Static<typeof UpdateUserRequest>
