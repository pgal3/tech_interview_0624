import { UserLoginResult } from "../types/userLoginResult.type"
import { UserQueryResult } from "../types/userQueryResult.type"

export const isUserLoginQueryResult = (res: any): res is UserLoginResult => {
  return res && res.id && res.role && res.UserAuth
}

export const isUserQueryResult = (res: any): res is UserQueryResult => {
  return res && res.id && res.username
}
