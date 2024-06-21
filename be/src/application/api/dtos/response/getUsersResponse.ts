import { Static, Type } from "@sinclair/typebox";
import { UserResponse } from "./userResponse";

export const GetUsersResponse = Type.Array(UserResponse)

export type GetUsersResponseType = Static<typeof GetUsersResponse>