import { Static, Type } from "@sinclair/typebox"

export const UpdateUserRequest = Type.Object({
  username: Type.Optional(Type.String({
    description: "User's unique username",
    minLength: 4
  })),
  email: Type.Optional(Type.String({
    description: "User's email",
    format: "email"
  })),
})

export type UpdateUserRequestType = Static<typeof UpdateUserRequest>
