import { Routes } from "@api/config/api-routes"
import { createPathFields } from "@api/docs/openApi"
import { CreatePostRequestType } from "@api/dtos/request/createPostRequest"
import { DeletePostRequest, DeletePostRequestType } from "@api/dtos/request/deletePostRequest"
import { SearchPostsQueryStringType } from "@api/dtos/request/searchPostsRequest"
import { InternalServerException } from "@api/exceptions/internalServerException"
import { NotFoundException } from "@api/exceptions/notFoundException"
import { UnauthorizedException } from "@api/exceptions/unauthorizedException"
import { authHook } from "@api/hooks/authHook"
import { mapSearcheablePostFields, mapToPostResponse } from "@api/mappers/postsRoutesMappers"
import { postPort, PostPort } from "@api/ports/postPort"
import { UserRole } from "@domain/enums/userRoleEnum"
import { diContainer } from "@fastify/awilix"
import { requestContext } from "@fastify/request-context"
import { FastifyInstance } from "fastify"

export const createPostsRoutes = async (fastify: FastifyInstance) => {
	fastify.post<{ Body: CreatePostRequestType }>(
		Routes.POSTS.CREATE.BASE,
		{
			onRequest: authHook,
			schema: {
				description: "Create a new post",
				body: Routes.POSTS.CREATE.REQUEST,
				response: Routes.POSTS.CREATE.RESPONSE,
				...createPathFields("posts", true, "application/json")
			}
		},
		async (req, res) => {
			const { body } = req
			const { uid, username } = requestContext.get("consumer")
			const { title, content } = body
			const port = req.diScope.resolve<PostPort>(postPort)
			const result = await port.CreatePost(uid, username, title, content)
			if (result.isErr()) {
				throw new InternalServerException(result.unwrapErr())
			}
			return res.code(201).send()
		}
	)

	fastify.get<{ Querystring: SearchPostsQueryStringType }>(
		Routes.POSTS.SEARCH.BASE,
		{
			onRequest: authHook,
			schema: {
				description: "Search posts",
				querystring: Routes.POSTS.SEARCH.QUERY,
				response: Routes.POSTS.SEARCH.RESPONSE,
				...createPathFields("posts", true, "application/json")
			}
		},
		async (req, res) => {
			const { query } = req
			const { page, limit } = query
			const searchQuery = mapSearcheablePostFields(query)
			const port = diContainer.resolve<PostPort>(postPort)
			const searchResult = await port.SearchPosts(searchQuery, page, limit)
			if (searchResult.isErr()) {
				throw new InternalServerException(searchResult.unwrapErr())
			}
			const posts = searchResult.unwrap()
			return res.status(200).send(posts.map(post => mapToPostResponse(post)))
		}
	)

	fastify.delete<{ Params: DeletePostRequestType }>(
		`${Routes.POSTS.DELETE.BASE}/:${Routes.POSTS.DELETE.PARAMS.POST_ID}`,
		{
			onRequest: authHook,
			schema: {
				description: "Delete own post (or others if admin)",
				params: DeletePostRequest,
				response: Routes.POSTS.DELETE.RESPONSE,
				...createPathFields("posts", true, "application/json")
			}
		},
		async (req, res) => {
			const { uid, role } = requestContext.get("consumer")
			const { params } = req
			const { postId } = params
			const port = diContainer.resolve<PostPort>(postPort)
			const postEntityResult = await port.GetPost(postId)
			if (postEntityResult.isErr()) {
				throw new NotFoundException()
			}
			const postEntity = postEntityResult.unwrap()
			if (postEntity.authorId !== uid && role !== UserRole.ADMIN) {
				throw new UnauthorizedException()
			}
			const result = await port.DeletePost(postId)
			if (result.isErr()) {
				throw new InternalServerException(result.unwrapErr())
			}
			return res.status(204).send()
		}
	)
}
