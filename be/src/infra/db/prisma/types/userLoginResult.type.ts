export type UserLoginResult = {
  id: string
  role: string
  UserAuth: {
    id: number
    username: string
    hash: string
    salt: string
    createdAt: Date
    updatedAt: Date
  }
}
