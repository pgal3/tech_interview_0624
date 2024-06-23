import { Result } from "oxide.ts"
import { UserRole } from "@domain/enums/userRoleEnum"
import { AwilixRegistrable } from "@libs/common/interfaces/awilix-registrable.interface"
import { UserEntity } from "@domain/entities/userEntity"
import { PostEntity } from "@domain/entities/postEntity"
import { SearchablePostFields } from "@domain/value-objects/searchablePostFields"

export const postPort = Symbol.for("postPort")
export interface PostPort extends AwilixRegistrable {
	CreatePost(userId: string, username: string, title: string, content: string): Promise<Result<PostEntity, Error>>
	GetPost(postId: string): Promise<Result<PostEntity, Error>>
	SearchPosts(searchFields: SearchablePostFields, page: number, limit: number): Promise<Result<PostEntity[], Error>>
	DeletePost(postId: string): Promise<Result<boolean, Error>>
}
