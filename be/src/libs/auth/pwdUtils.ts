import { pbkdf2Sync, randomBytes } from "crypto"

const SALT_SIZE = 256
const ALGORITHM = "sha512"

export const generateSalt = (): string => {
  return randomBytes(SALT_SIZE).toString()
}

export const hashPassword = (plainPassword: string, salt: string): string => {
  return pbkdf2Sync(plainPassword, salt, 10000, 60, ALGORITHM).toString()
}

export const checkPassword = (
  plainPassword: string,
  salt: string,
  hashedPassword: string
): boolean => {
  return hashPassword(plainPassword, salt) === hashedPassword
}
