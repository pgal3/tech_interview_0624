import { Static, Type } from "@sinclair/typebox"
import { DEFAULT_PICTURE_URL } from "@api/constants/constants"

export const UserResponse = Type.Object({
  id: Type.String({ format: "uuid" }),
  username: Type.String(),
  email: Type.Optional(Type.String({ format: "email" })),
  picture: Type.String({ format: "hostname", default: DEFAULT_PICTURE_URL })
})

export type UserResponseType = Static<typeof UserResponse>
