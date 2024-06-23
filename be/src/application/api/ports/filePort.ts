import { MultipartFile } from "@fastify/multipart"
import { AwilixRegistrable } from "@libs/common/interfaces/awilix-registrable.interface"
import { Result } from "oxide.ts"

export const filePort = Symbol.for("filePort")
export interface FilePort extends AwilixRegistrable {
	Save(userId: string, file: MultipartFile): Promise<Result<string, Error>>
	GetUrl(fileId: string): Result<string, Error>
	Delete(fileId: string): Promise<Result<boolean, Error>>
}
