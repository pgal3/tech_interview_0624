import { UserLoginQueryResult } from "../types/userLoginQueryResult.type"

export const isUserLoginQueryResult = (res: any): res is UserLoginQueryResult => {
  return res && res.UserAuth
}
