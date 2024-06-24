import { AwilixRegistrable } from "@libs/common/interfaces/awilix-registrable.interface"
import { Result } from "oxide.ts"

export const cachePort = Symbol.for("cachePort")

export interface CachePort extends AwilixRegistrable {
    save(key: string, value: any): Promise<Result<boolean,Error>>
    get<T>(key: string): Promise<Result<T | undefined,Error>>
    delete(key: string): Promise<Result<boolean,Error>>
}