import { Static, Type } from "@sinclair/typebox"

export const GetFollowersResponse = Type.Array(
    Type.Object({
        id: Type.String({ description: "User's ID", format: "uuid" }),
        username: Type.String({ description: "Username of your follower", examples: ["ammaccabanane___"] }),
        start_date: Type.String({ description: "Following start date", format: "date-time", examples: ["2023-06-24"]})
    })
)

export type GetFollowersResponseType = Static<typeof GetFollowersResponse>
