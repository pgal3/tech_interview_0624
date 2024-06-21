import { Static, Type } from "@sinclair/typebox"

export const UserResponse = Type.Object({
  id: Type.String({ description: "User's ID", format: "uuid" }),
  username: Type.String({ description: "User's username" }),
  email: Type.Optional(Type.String({ description: "User's email", format: "email" })),
  picture: Type.String({ description: "User's picture url", format: "hostname" })
})

export type UserResponseType = Static<typeof UserResponse>
