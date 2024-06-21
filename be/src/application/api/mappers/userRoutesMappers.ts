import { DEFAULT_PICTURE_ID } from "@api/constants/constants";
import { UserResponseType } from "@api/dtos/response/userResponse";
import { InternalServerException } from "@api/exceptions/internalServerException";
import { FilePort, filePort } from "@api/ports/filePort";
import { UserEntity } from "@domain/entities/userEntity";
import { diContainer } from "@fastify/awilix";

export const mapGetUserResponse = (user: UserEntity): UserResponseType => {
    const {id, username, email, picture: fileId} = user
    const port = diContainer.resolve<FilePort>(filePort)
    const pictureResult = port.GetUrl(fileId ?? DEFAULT_PICTURE_ID)
    if(pictureResult.isErr()){
        throw new InternalServerException(pictureResult.unwrapErr())
    }
    return {
        id,
        username,
        email,
        picture: pictureResult.unwrap()
    }
}