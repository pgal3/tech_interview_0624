import { Ok, Result } from "oxide.ts";
import { CachePort } from "src/application/webSocket/ports/cachePort";

export class LocalCachePortAdapter implements CachePort {
    private cache = new Map<string,any>()

    async save(key: string, value: any): Promise<Result<boolean, Error>> {
        this.cache.set(key, value)
        return Ok(true)
    }

    async get<T>(key: string): Promise<Result<T | undefined, Error>> {
        const res = this.cache.get(key) ?? undefined
        return Ok(res)
    }

    async delete(key: string): Promise<Result<boolean, Error>> {
        this.cache.delete(key)
        return Ok(true)
    }

    dispose(): void {}
}