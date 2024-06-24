import { Static, Type } from "@sinclair/typebox"

export const FollowRequest = Type.Object({
	userId: Type.String({ description: "user ID you want to follow", examples: ["ammaccabanane___"] })
})

export type FollowRequestType = Static<typeof FollowRequest>
