import { Static, Type } from "@sinclair/typebox"

export const SearchPostsQueryString = Type.Object({
	authorId: Type.Optional(Type.String({ description: "Author of the post", examples: ["dfd0abaa-845e-4e35-ab73-d47cdfc8ee90"] })),
	authorName: Type.Optional(Type.String({ description: "Author's username", examples: ["ammaccabanane___"] })),
	title: Type.Optional(Type.String({ description: "Post's title", examples: ["test post"] })),
	creationDate: Type.Optional(Type.String({ description: "Date of creation of the post", format: "date", examples: ["1994-06-24"] })),
	from: Type.Optional(Type.String({ description: "Date from which searching for posts", format: "date", examples: ["1994-06-24"] })),
	to: Type.Optional(Type.String({ description: "Date to which searching for posts", format: "date", examples: ["1994-06-24"] })),
	page: Type.Number({ description: "Page number", default: 0, minimum: 0, maximum: 100 }),
	limit: Type.Number({ description: "Number of posts per page", default: 10, minimum: 1, maximum: 50 })
})

export type SearchPostsQueryStringType = Static<typeof SearchPostsQueryString>
