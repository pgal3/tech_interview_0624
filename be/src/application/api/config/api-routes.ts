import { UserRole } from "@domain/enums/userRoleEnum"
import { LoginRequest } from "@api/dtos/request/loginRequest"
import { RegistrationRequest } from "@api/dtos/request/registrationRequest"

export const Routes = {
  REGISTRATION: {
    BASE: "/register",
    REQUEST: RegistrationRequest,
    RESPONSE: {
      201: {}
    }
  },
  LOGIN: {
    BASE: "/login",
    REQUEST: LoginRequest,
    RESPONSE: {}
  },
  USERS: {
    CREATE: {
      BASE: "/users"
    },
    GET_ALL: {
      BASE: "/users",
      ROLES: [UserRole.ADMIN]
    },
    GET: {
      BASE: "/users",
      PARAMS: {
        USER_ID: "userId"
      }
    },
    UPDATE: {},
    DELETE: {}
  },
  POSTS: {
    CREATE: {},
    DELETE: {}
  }
}
