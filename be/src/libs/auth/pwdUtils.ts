import { pbkdf2Sync, randomBytes } from "node:crypto"

const SALT_SIZE = 50
const ALGORITHM = "sha512"

export const generateSalt = (): string => {
  return randomBytes(SALT_SIZE).toString('base64')
}

export const hashPassword = (plainPassword: string, salt: string): string => {
  return pbkdf2Sync(plainPassword, salt, 10000, 60, ALGORITHM).toString('base64')
}

export const checkPassword = (
  plainPassword: string,
  salt: string,
  hashedPassword: string
): boolean => {
  return hashPassword(plainPassword, salt) === hashedPassword
}
