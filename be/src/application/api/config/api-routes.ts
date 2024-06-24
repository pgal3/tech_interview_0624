import { UserRole } from "@domain/enums/userRoleEnum"
import { LoginRequest } from "@api/dtos/request/loginRequest"
import { RegistrationRequest } from "@api/dtos/request/registrationRequest"
import { LoginResponse } from "@api/dtos/response/loginResponse"
import { UserResponse } from "@api/dtos/response/userResponse"
import { UpdateUserRequest } from "@api/dtos/request/updateUser.request"
import { CreatePostRequest } from "@api/dtos/request/createPostRequest"
import { GetUsersResponse } from "@api/dtos/response/getUsersResponse"
import { GetUsersQueryString } from "@api/dtos/request/getAllUsersRequest"
import { SearchPostsQueryString } from "@api/dtos/request/searchPostsRequest"
import { SearchPostsResponse } from "@api/dtos/response/searchPostsResponse"
import { FollowRequest } from "@api/dtos/request/followRequest"
import { GetFollowersResponse } from "@api/dtos/response/getFollowersResponse"

export const Routes = {
	REGISTRATION: {
		BASE: "/register",
		REQUEST: RegistrationRequest,
		RESPONSE: {
			201: {
				type: "null",
				description: "User created"
			}
		}
	},
	LOGIN: {
		BASE: "/login",
		REQUEST: LoginRequest,
		RESPONSE: {
			200: LoginResponse
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
				204: {
					type: "null",
					description: "User deleted"
				}
			}
		}
	},
	POSTS: {
		CREATE: {
			BASE: "/posts",
			REQUEST: CreatePostRequest,
			RESPONSE: {
				201: {
					type: "null",
					description: "Post created"
				}
			}
		},
		SEARCH: {
			BASE: "/posts/search",
			QUERY: SearchPostsQueryString,
			RESPONSE: {
				200: SearchPostsResponse
			}
		},
		DELETE: {
			BASE: "/posts",
			PARAMS: {
				POST_ID: "postId"
			},
			RESPONSE: {
				204: {
					type: "null",
					description: "Post deleted"
				}
			}
		}
	},
	FOLLOWS: {
		FOLLOW: {
			BASE: "/users/follow",
			REQUEST: FollowRequest,
			RESPONSE: {
				201: {
					type: "null",
					description: "Following started"
				}
			}
		},
		UNFOLLOW: {
			BASE: "/users/follow",
			REQUEST: FollowRequest,
			RESPONSE: {
				204: {
					type: "null",
					description: "Following started"
				}
			}
		},
		GET_FOLLOWERS: {
			BASE: "/users/followers",
			RESPONSE: {
				200: GetFollowersResponse
			}
		},
		GET_FOLLOWINGS: {}
	}
}
