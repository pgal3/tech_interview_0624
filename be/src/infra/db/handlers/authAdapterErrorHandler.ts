import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError
} from "@prisma/client/runtime/library"
import { InternalError } from "src/domain/errors/internalError"
import { UnknownError } from "src/domain/errors/unknownError"
import { ValidationError } from "src/domain/errors/validationError"
import { Err } from "oxide.ts"

export class AuthAdapterErrorHandler {
  static handleError(error: unknown): Err<Error> {
    if (error instanceof PrismaClientInitializationError) {
      return Err(new InternalError())
    }
    if (error instanceof PrismaClientKnownRequestError) {
      console.error(error.message)
      return Err(new InternalError())
    }
    if (error instanceof PrismaClientUnknownRequestError) {
      console.error(error.message)
      return Err(new InternalError())
    }
    if (error instanceof PrismaClientValidationError) {
      return Err(new ValidationError())
    }
    return Err(new UnknownError())
  }
}
