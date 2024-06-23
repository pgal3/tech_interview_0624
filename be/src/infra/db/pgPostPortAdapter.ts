import { PostPort } from "@api/ports/postPort"
import { PostEntity } from "@domain/entities/postEntity"
import { PrismaClient } from "@prisma/client"
import { Ok, Result } from "oxide.ts"
import { DbAdapterErrorHandler } from "./handlers/dbAdapterErrorHandler"
import { DbPostAdapterSuccessHandler } from "./handlers/dbPostAdapterSuccessHandler"
import { SearchablePostFields } from "@domain/value-objects/searchablePostFields"

export class PgPostPortAdapter implements PostPort {
	protected readonly db: PrismaClient
	constructor({ db }: { db: PrismaClient }) {
		this.db = db
	}

	async CreatePost(userId: string, username: string, title: string, content: string): Promise<Result<PostEntity, Error>> {
		try {
			const post = await this.db.posts.create({
				data: {
					authorId: userId,
					authorName: username,
					title,
					content
				}
			})
			return DbPostAdapterSuccessHandler.handlePostCreationResult(post)
		} catch (error) {
			return DbAdapterErrorHandler.handleError(error)
		}
	}

	async GetPost(postId: string): Promise<Result<PostEntity, Error>> {
		try {
			const post = await this.db.posts.findUnique({
				where: {
					id: postId
				}
			})
			return DbPostAdapterSuccessHandler.handlePostCreationResult(post)
		} catch (error) {
			return DbAdapterErrorHandler.handleError(error)
		}
	}

	async SearchPosts(searchFields: SearchablePostFields, page: number, limit: number): Promise<Result<PostEntity[], Error>> {
		try {
			const { authorId, authorName, title, creationDate, from, to } = searchFields
			const posts = await this.db.posts.findMany({
				where: {
					...(authorId ? { authorId } : {}),
					...(authorName ? { authorName } : {}),
					...(title ? { title } : {}),
					...(creationDate ? { createdAt: creationDate } : {}),
					...(from ? { createdAt: { gte: creationDate } } : {}),
					...(to ? { createdAt: { lte: creationDate } } : {})
				},
				skip: page * limit,
				take: limit
			})
			return DbPostAdapterSuccessHandler.handlePostsSearchResult(posts)
		} catch (error) {
			return DbAdapterErrorHandler.handleError(error)
		}
	}

	async DeletePost(postId: string): Promise<Result<boolean, Error>> {
		try {
			await this.db.posts.delete({
				where: {
					id: postId
				}
			})
			return Ok(true)
		} catch (error) {
			return DbAdapterErrorHandler.handleError(error)
		}
	}

	dispose(): void {}
}
