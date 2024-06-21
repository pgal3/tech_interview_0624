import { UserResponseType } from "@api/dtos/response/userResponse";
import { UserEntity } from "@domain/entities/userEntity";

export const mapGetUserResponse = (user: UserEntity): UserResponseType => {
    const {id, username, email, picture} = user
    return {
        id,
        username,
        email,
        picture
    }
}