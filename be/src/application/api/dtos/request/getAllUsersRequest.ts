import { Static, Type } from "@sinclair/typebox"

export const GetUsersQueryString = Type.Object({
	page: Type.Number({ description: "Page number", default: 0, minimum: 0, maximum: 100 }),
	limit: Type.Number({ description: "Number of users per page", default: 10, minimum: 1, maximum: 50 })
})

export type GetUsersQueryStringType = Static<typeof GetUsersQueryString>
