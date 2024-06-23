import * as jwt from "jsonwebtoken"
import { Err, Ok, Result } from "oxide.ts"
import { InvalidTokenError } from "@domain/errors/invalidTokenError"

const SECRET_KEY = process.env["JWT_SECRET_KEY"] || "mysuperstrongsecretkey"
const ISSUER = process.env["JWT_ISSUER"] || "TEST-BE"

export const generateToken = <T extends object>(payload: T): string => {
	return jwt.sign(payload, SECRET_KEY, {
		expiresIn: "1h",
		issuer: ISSUER,
		audience: []
	})
}

export const getPayload = <T>(token: string): Result<T, InvalidTokenError> => {
	try {
		const payload = jwt.verify(token, SECRET_KEY, { issuer: ISSUER }) as T
		return Ok(payload)
	} catch (error) {
		return Err(new InvalidTokenError())
	}
}
