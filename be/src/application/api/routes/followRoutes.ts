import { Routes } from "@api/config/api-routes"
import { createPathFields } from "@api/docs/openApi"
import { FollowRequestType } from "@api/dtos/request/followRequest"
import { InternalServerException } from "@api/exceptions/internalServerException"
import { authHook } from "@api/hooks/authHook"
import { mapToGetFollowersResponse } from "@api/mappers/followRoutesMappers"
import { followPort, FollowPort } from "@api/ports/followPort"
import { diContainer } from "@fastify/awilix"
import { requestContext } from "@fastify/request-context"
import { FastifyInstance } from "fastify"

export const createFollowRoutes = async (fastify: FastifyInstance) => {
    fastify.post<{ Body: FollowRequestType}>(
        Routes.FOLLOWS.FOLLOW.BASE,
        {
            onRequest: authHook,
            schema: {
                description: "Start following a user",
                response: Routes.FOLLOWS.FOLLOW.RESPONSE,
                ...createPathFields("followers", true, "application/json")
            }
        }, async (req, res) => {
            const { uid } = requestContext.get("consumer")
            const { userId } = req.body
            const port = diContainer.resolve<FollowPort>(followPort)
            const result = await port.follow(uid, userId)
            if(result.isErr()){
                throw new InternalServerException(result.unwrapErr())
            }
            return res.status(201).send()
        }
    )

    fastify.delete<{ Body: FollowRequestType}>(
        Routes.FOLLOWS.UNFOLLOW.BASE,
        {
            onRequest: authHook,
            schema: {
                description: "Stop following a user",
                response: Routes.FOLLOWS.UNFOLLOW.RESPONSE,
                ...createPathFields("followers", true, "application/json")
            }
        }, async (req, res) => {
            const { uid } = requestContext.get("consumer")
            const { userId } = req.body
            const port = diContainer.resolve<FollowPort>(followPort)
            const result = await port.unfollow(uid, userId)
            if(result.isErr()){
                throw new InternalServerException(result.unwrapErr())
            }
            return res.status(204).send()
        }
    )

    fastify.get(
        Routes.FOLLOWS.GET_FOLLOWERS.BASE,
        {
            onRequest: authHook,
            schema: {
                description: "Get my followers",
                response: Routes.FOLLOWS.GET_FOLLOWERS.RESPONSE,
                ...createPathFields("followers", true, "application/json")
            }
        }, async (req, res) => {
            const { uid } = requestContext.get("consumer")
            const port = diContainer.resolve<FollowPort>(followPort)
            const result = await port.getFollowers(uid)
            if(result.isErr()){
                throw new InternalServerException(result.unwrapErr())
            }
            const followers = result.unwrap()
            return res.status(200).send(mapToGetFollowersResponse(followers))
        }
    )
}
