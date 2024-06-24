import { GetFollowersResponseType } from "@api/dtos/response/getFollowersResponse";
import { Follower } from "@domain/types/follower.type";

export const mapToGetFollowersResponse = (res: Follower[]): GetFollowersResponseType => {
    return res.map(follower => ({
        id: follower.id,
        username: follower.username,
        start_date: follower.startDate.toISOString()
    }))
}