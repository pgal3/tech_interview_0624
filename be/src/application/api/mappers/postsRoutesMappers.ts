import { SearchPostsQueryStringType } from "@api/dtos/request/searchPostsRequest"
import { GetPostResponseType } from "@api/dtos/response/getPostResponse"
import { PostEntity } from "@domain/entities/postEntity"
import { SearchablePostFields } from "@domain/value-objects/searchablePostFields"

export const mapSearcheablePostFields = (query: SearchPostsQueryStringType): SearchablePostFields => {
	const { title, authorId, authorName, creationDate, from, to } = query
	const createdAtDate = creationDate ? new Date(creationDate) : undefined
	const fromDate = from ? new Date(from) : undefined
	const toDate = to ? new Date(to) : undefined
	return new SearchablePostFields({ authorId, authorName, title, creationDate: createdAtDate, from: fromDate, to: toDate })
}

export const mapToPostResponse = (post: PostEntity): GetPostResponseType => {
	const { authorName, title, content, creationDate } = post
	return {
		author: authorName,
		title,
		content,
		date: creationDate.toISOString()
	}
}
