export type UserLoginQueryResult = {
  id: string
  UserAuth: {
    id: number
    username: string
    hash: string
    salt: string
    role: number
    createdAt: Date
    updatedAt: Date
  }
}
