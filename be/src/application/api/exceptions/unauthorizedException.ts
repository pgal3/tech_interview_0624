import { Exception } from "./base.exception"
import { ExceptionCode } from "./exceptionCodeEnum"

export class UnauthorizedException extends Exception {
	constructor(error?: Error) {
		super(401, "Unauthorized", ExceptionCode.UNAUTHORIZED, "You're not authorized to perform this action. Please check your access_token", error)
	}
}
