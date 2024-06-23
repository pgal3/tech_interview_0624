import { Ok } from "oxide.ts"
import { PostQueryResult } from "../prisma/types/postQueryResult.type"
import { PostEntity } from "@domain/entities/postEntity"

export class DbPostAdapterSuccessHandler {
	static handlePostCreationResult(res: PostQueryResult): Ok<PostEntity> {
		const { id, authorName, title, content, authorId, createdAt } = res
		return Ok(
			PostEntity.from(id, {
				title,
				content,
				authorId,
				authorName,
				creationDate: createdAt
			})
		)
	}

	static handlePostsSearchResult(res: PostQueryResult[]): Ok<PostEntity[]> {
		return Ok(
			res.map(post =>
				PostEntity.from(post.id, {
					title: post.title,
					content: post.content,
					authorId: post.authorId,
					authorName: post.authorName,
					creationDate: post.createdAt
				})
			)
		)
	}
}
