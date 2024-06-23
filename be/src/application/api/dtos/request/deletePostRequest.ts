import { Static, Type } from "@sinclair/typebox"

export const DeletePostRequest = Type.Object({
	postId: Type.String({ description: "Post id", examples: ["dfd0abaa-845e-4e35-ab73-d47cdfc8ee90"] })
})

export type DeletePostRequestType = Static<typeof DeletePostRequest>
