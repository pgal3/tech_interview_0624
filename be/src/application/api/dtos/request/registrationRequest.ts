import { Static, Type } from "@sinclair/typebox"
import { UserRole } from "@domain/enums/userRoleEnum"

export const RegistrationRequest = Type.Object({
  username: Type.String({
    description: "User's unique username",
    minLength: 4
  }),
  password: Type.String({ description: "User password", minLength: 4 }), //TODO: add a pattern to check maiusc/minusc/numbers etc
  role: Type.Enum(UserRole, {
    default: UserRole.USER,
    description: "User role"
  })
})

export type RegistrationRequestType = Static<typeof RegistrationRequest>
