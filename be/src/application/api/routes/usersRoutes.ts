import { Routes } from "@api/config/api-routes"
import { GetUsersQueryStringType } from "@api/dtos/request/getAllUsersRequest"
import { UpdateUserRequest, UpdateUserRequestType } from "@api/dtos/request/updateUser.request"
import { BadRequestException } from "@api/exceptions/badRequestException"
import { ForbiddenException } from "@api/exceptions/forbiddenException"
import { InternalServerException } from "@api/exceptions/internalServerException"
import { authHook } from "@api/hooks/authHook"
import { roleGuardHook } from "@api/hooks/roleGuardHook"
import { mapGetUserResponse } from "@api/mappers/userRoutesMappers"
import { FilePort, filePort } from "@api/ports/filePort"
import { UserPort, userPort } from "@api/ports/userPort"
import { UpdatableUserInfo } from "@domain/value-objects/updatableUserInfo"
import { diContainer } from "@fastify/awilix"
import { requestContext } from "@fastify/request-context"
import { FastifyInstance } from "fastify"

export const createUsersRoutes = (fastify: FastifyInstance) => {
    
    fastify.get(Routes.USERS.GET.BASE, {
        onRequest: authHook,
        schema: {
            response: Routes.USERS.GET.RESPONSE
        }
    }, async (_req, res) => {
        const {uid} = requestContext.get("consumer")
        const port = diContainer.resolve<UserPort>(userPort)
        const userInfo = await port.GetUser(uid)
        if(userInfo.isErr()){
            throw new InternalServerException(userInfo.unwrapErr())
        }
        return res.status(200).send(mapGetUserResponse(userInfo.unwrap()))
    })

    fastify.get<{ Querystring: GetUsersQueryStringType }>(Routes.USERS.GET_ALL.BASE, {
        onRequest: authHook,
        preHandler: roleGuardHook(Routes.USERS.GET_ALL.ROLES),
        schema: {
            querystring: Routes.USERS.GET_ALL.QUERY,
            response: Routes.USERS.GET_ALL.RESPONSE
        }
    }, async (req, res) => {
        const { page, limit } = req.query
        const port = diContainer.resolve<UserPort>(userPort)
        const usersResult = await port.GetAllUsers(page, limit)
        if(usersResult.isErr()){
            throw new InternalServerException(usersResult.unwrapErr())
        }
        const users = usersResult.unwrap()
        return res.status(200).send(users.map(user => mapGetUserResponse(user)))
    })

    fastify.put<{ Body: UpdateUserRequestType }>(Routes.USERS.UPDATE.BASE, {
        onRequest: authHook,
        schema: {
            response: Routes.USERS.UPDATE.RESPONSE
        }
    }, async (req, res ) => {
        const { username, email } = req.body
        const {uid} = requestContext.get("consumer")
        const port = diContainer.resolve<UserPort>(userPort)
        const updatedUser = await port.UpdateUser(uid, new UpdatableUserInfo({username, email}))
        if(updatedUser.isErr()){
            throw new InternalServerException(updatedUser.unwrapErr())
        }
        return res.status(200).send(mapGetUserResponse(updatedUser.unwrap()))
    })

    fastify.put(Routes.USERS.UPDATE_PICTURE.BASE, {
        onRequest: authHook,
        schema: {
            response: Routes.USERS.UPDATE_PICTURE.RESPONSE
        }
    }, async (req, res ) => {
        if(!req.isMultipart()){
            throw new BadRequestException()
        }
        const { uid } = requestContext.get("consumer")
        const data = await req.file()
        const fport = diContainer.resolve<FilePort>(filePort)
        const dbport = diContainer.resolve<UserPort>(userPort)
        const fileId = await fport.Save(uid, data)
        if(fileId.isErr()){
            throw new InternalServerException(fileId.unwrapErr())
        }
        const updatedUser = await dbport.UpdateUser(uid, new UpdatableUserInfo({ picture: fileId.unwrap() }))
        if(updatedUser.isErr()){
            throw new InternalServerException(updatedUser.unwrapErr())
        }
        return res.status(201).send(mapGetUserResponse(updatedUser.unwrap()))
    })

    fastify.delete(`${Routes.USERS.DELETE.BASE}`, {
        onRequest: authHook,
        schema: {
            response: Routes.USERS.DELETE.RESPONSE
        }
    }, async (_req, res) => {
        const user = requestContext.get("consumer")
        if(!user){
            throw new ForbiddenException()
        }
        const port = diContainer.resolve<UserPort>(userPort)
        const deleteCommand = await port.DeleteUser(user.uid)
        if(deleteCommand.isErr()){
            throw new InternalServerException(deleteCommand.unwrapErr())
        }
        return res.status(204).send()
    })
}