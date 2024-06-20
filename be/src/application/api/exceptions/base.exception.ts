import { ExceptionCode } from "./exceptionCodeEnum"

export abstract class Exception {
  readonly error?: Error
  readonly code: ExceptionCode
  readonly message: string
  readonly statusCode: number

  constructor(status: number, message: string, code: ExceptionCode, error?: Error) {
    this.statusCode = status
    this.message = message
    this.code = code
    this.error = error
  }
}
