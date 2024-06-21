import { Static, Type } from "@sinclair/typebox"

export const CreatePostRequest = Type.Object({
    title: Type.String({ description: "Post's title", minLength: 1}),
    content: Type.String({ description: "Post's content", minLength: 1})
})

export type CreatePostRequestType = Static<typeof CreatePostRequest>
