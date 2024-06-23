import { Static, Type } from "@sinclair/typebox"
import { GetPostResponse } from "./getPostResponse"

export const SearchPostsResponse = Type.Array(GetPostResponse)

export type SearchPostsResponseType = Static<typeof SearchPostsResponse>
