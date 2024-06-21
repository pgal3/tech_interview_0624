import { Static, Type } from "@sinclair/typebox"

export const LoginResponse = Type.Object({
  access_token: Type.String({ description: "user access token"})
})

export type LoginResponseType = Static<typeof LoginResponse>
