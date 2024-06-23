import { Exception } from "./base.exception"
import { ExceptionCode } from "./exceptionCodeEnum"

export class ForbiddenException extends Exception {
	constructor(error?: Error) {
		super(403, "Forbidden", ExceptionCode.FORBIDDEN, "The action you're trying to perform requires higher privileges", error)
	}
}
