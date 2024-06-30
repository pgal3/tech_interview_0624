import { Exception } from "./base.exception"
import { ExceptionCode } from "./exceptionCodeEnum"

export class BadRequestException extends Exception {
	constructor(error?: Error) {
		super(400, "Bad Request", ExceptionCode.BAD_REQUEST_ERROR, "There's something wrong in the request input", error)
	}
}
