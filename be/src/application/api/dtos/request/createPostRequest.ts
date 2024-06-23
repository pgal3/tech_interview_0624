import { Static, Type } from "@sinclair/typebox"

export const CreatePostRequest = Type.Object({
	title: Type.String({ description: "Post's title (max 100 characters)", examples: ["test post"], minLength: 1, maxLength: 100 }),
	content: Type.String({ description: "Post's content", examples: ["Lorem ipsum dolor sit amet"], minLength: 1, maxLength: 400 })
})

export type CreatePostRequestType = Static<typeof CreatePostRequest>
