import { Static, Type } from "@sinclair/typebox"

export const GetPostResponse = Type.Object({
	author: Type.String({ description: "Author's username", minLength: 1 }),
	title: Type.String({ description: "Post's title", minLength: 1 }),
	content: Type.String({ description: "Post's content", minLength: 1 }),
	date: Type.String({ description: "Post date", format: "date-time" })
})

export type GetPostResponseType = Static<typeof GetPostResponse>
