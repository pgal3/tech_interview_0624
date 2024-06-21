import { Static, Type } from "@sinclair/typebox"

export const LoginResponse = Type.Object({
  access_token: Type.String()
})

export type LoginResponseType = Static<typeof LoginResponse>
