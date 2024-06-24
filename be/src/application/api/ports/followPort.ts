import { Follower } from "@domain/types/follower.type"
import { AwilixRegistrable } from "@libs/common/interfaces/awilix-registrable.interface"
import { Result } from "oxide.ts"

export const followPort = Symbol.for("followPort")

export interface FollowPort extends AwilixRegistrable {
    follow(userId: string, targetId: string): Promise<Result<boolean,Error>>
    unfollow(userId: string, targetId: string): Promise<Result<boolean,Error>>
    getFollowers(userId: string): Promise<Result<Follower[],Error>>
    getFollowing(userId: string): Promise<Result<Follower[],Error>>
}