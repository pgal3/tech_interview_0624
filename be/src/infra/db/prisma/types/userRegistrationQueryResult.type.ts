export type UserRegistrationQueryResult = {
  id: string
  username: string
  email: string | null
  picture: string | null
  createdAt: Date
  updatedAt: Date
}
