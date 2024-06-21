export type UserUpdateResult = {
    id: string
    username: string
    role: string,
    email: string | null
    picture: string | null
    createdAt: Date
    updatedAt: Date
}