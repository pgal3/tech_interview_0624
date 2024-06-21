import { UserRole } from "@domain/enums/userRoleEnum"
import { LoginRequest } from "@api/dtos/request/loginRequest"
import { RegistrationRequest } from "@api/dtos/request/registrationRequest"
import { LoginResponse } from "@api/dtos/response/loginResponse"
import { UserResponse } from "@api/dtos/response/userResponse"
import { UpdateUserRequest } from "@api/dtos/request/updateUser.request"
import { CreatePostRequest } from "@api/dtos/request/createPostRequest"
import { GetPostResponse } from "@api/dtos/response/getPostResponse"
import { GetUsersResponse } from "@api/dtos/response/getUsersResponse"
import { GetUsersQueryString } from "@api/dtos/request/getAllUsersRequest"

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
    RESPONSE: {
      200: LoginResponse,
    }
  },
  USERS: {
    GET_ALL: {
      BASE: "/users/all",
      QUERY: GetUsersQueryString,
      ROLES: [UserRole.ADMIN],
      RESPONSE: {
        200: GetUsersResponse
      }
    },
    GET: {
      BASE: "/users",
      RESPONSE: {
        200: UserResponse
      }
    },
    UPDATE: {
      BASE: "/users",
      REQUEST: UpdateUserRequest,
      RESPONSE: {
        200: UserResponse
      }
    },
    UPDATE_PICTURE: {
      BASE: "/users/picture",
      REQUEST: UpdateUserRequest,
      RESPONSE: {
        200: UserResponse
      }
    },
    DELETE: {
       BASE: "/users",
       RESPONSE: {
        204: {}
      }
    },
  },
  POSTS: {
    CREATE: {
      BASE: "/users/posts",
      REQUEST: CreatePostRequest,
      RESPONSE: {
        201: {}
      }
    },
    GET: {
      BASE: "/users/posts",
      RESPONSE: {
        200: GetPostResponse
      }
    },
    DELETE: {}
  }
}
