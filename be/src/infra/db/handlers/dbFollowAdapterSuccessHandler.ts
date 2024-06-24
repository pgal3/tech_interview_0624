import { Ok } from "oxide.ts"
import { Follower } from "@domain/types/follower.type"
import { GetFollowersResultType } from "../prisma/types/getFollowersResult.type"
import { GetFollowingResultType } from "../prisma/types/getFollowingResult.type"

export class DbFollowAdapterSuccessHandler {
	static handleGetFollowersResult(res: GetFollowersResultType): Ok<Follower[]> {
		return Ok(
			res.map(follower => ({
                id: follower.follower.id,
                username: follower.follower.username,
                startDate: follower.createdAt
            }))
		)
	}

    static handleGetFollowingResult(res: GetFollowingResultType): Ok<Follower[]> {
		return Ok(
			res.map(following => ({
                id: following.following.id,
                username: following.following.username,
                startDate: following.createdAt
            }))
		)
	}
}
