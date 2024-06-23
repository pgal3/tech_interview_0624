import { Exception } from "./base.exception"
import { ExceptionCode } from "./exceptionCodeEnum"

export class NotFoundException extends Exception {
	constructor(error?: Error) {
		super(404, "Not Found", ExceptionCode.NOT_FOUND, "Sorry, we couldn't found what you're searching", error)
	}
}
