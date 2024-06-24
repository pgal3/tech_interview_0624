import { FollowPort } from "@api/ports/followPort";
import { PrismaClient } from "@prisma/client";
import { Ok, Result } from "oxide.ts";
import { DbAdapterErrorHandler } from "./handlers/dbAdapterErrorHandler";
import { Follower } from "@domain/types/follower.type";
import { DbFollowAdapterSuccessHandler } from "./handlers/dbFollowAdapterSuccessHandler";

export class PgFollowPortAdapter implements FollowPort {
    protected readonly db: PrismaClient
	constructor({ db }: { db: PrismaClient }) {
		this.db = db
	}

    async follow(userId: string, targetId: string): Promise<Result<boolean, Error>> {
        try {
            await this.db.follows.create({
                data: {
                    followerId: userId,
                    followingId: targetId
                }
            })
            return Ok(true)
        } catch (error) {
            return DbAdapterErrorHandler.handleError(error)
        }
    }

    async unfollow(userId: string, targetId: string): Promise<Result<boolean, Error>> {
        try {
            await this.db.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: userId,
                        followingId: targetId
                    }
                }
            })
            return Ok(true)
        } catch (error) {
            return DbAdapterErrorHandler.handleError(error)
        }
    }

    async getFollowers(userId: string): Promise<Result<Follower[], Error>> {
        try {
            const followers = await this.db.follows.findMany({
                select: {
                    follower: {
                        select: {
                            id: true,
                            username: true
                        }
                    },
                    createdAt: true
                },
                where: {
                    followingId: userId
                }
            })
            return DbFollowAdapterSuccessHandler.handleGetFollowersResult(followers)
        } catch (error) {
            return DbAdapterErrorHandler.handleError(error)
        }
    }

    async getFollowing(userId: string): Promise<Result<Follower[], Error>> {
        try {
            const following = await this.db.follows.findMany({
                select: {
                    following: {
                        select: {
                            id: true,
                            username: true
                        }
                    },
                    createdAt: true
                },
                where: {
                    followerId: userId
                }
            })
            return DbFollowAdapterSuccessHandler.handleGetFollowingResult(following)
        } catch (error) {
            return DbAdapterErrorHandler.handleError(error)
        }
    }

    dispose(): void {}
}