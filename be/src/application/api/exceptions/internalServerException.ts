import { Exception } from "./base.exception"
import { ExceptionCode } from "./exceptionCodeEnum"

export class InternalServerException extends Exception {
  constructor(error?: Error) {
    super(500, "Internal Server Error", ExceptionCode.INTERNAL_SERVER_ERROR, "Ooops, something went wrong", error)
  }
}
