import { FilePort } from "@api/ports/filePort"
import { MultipartFile } from "@fastify/multipart"
import { Err, Ok, Result } from "oxide.ts"
import { UploadApiResponse, v2 } from "cloudinary"

export class CloudinaryFilePortAdapter implements FilePort {
	protected readonly client: typeof v2
	constructor({ fileClient }: { fileClient: typeof v2 }) {
		this.client = fileClient
	}

	async Save(userId: string, file: MultipartFile): Promise<Result<string, Error>> {
		try {
			const buf = await file.toBuffer()
			const res = await new Promise<UploadApiResponse>((resolve, reject) => {
				this.client.uploader
					.upload_stream({ public_id: userId, access_mode: "authenticated", overwrite: true }, (err, result) => {
						result ? resolve(result) : reject(err)
					})
					.end(buf)
			})
			return Ok(res.public_id)
		} catch (error) {
			return Err(error)
		}
	}

	GetUrl(fileId: string): Result<string, Error> {
		try {
			const url = this.client.utils.url(fileId, { secure: true, shorten: true })
			return Ok(url)
		} catch (error) {
			return Err(error)
		}
	}

	async Delete(fileId: string): Promise<Result<boolean, Error>> {
		try {
			await this.client.uploader.destroy(fileId, { invalidate: true })
			return Ok(true)
		} catch (error) {
			return Err(error)
		}
	}

	dispose(): void {}
}
