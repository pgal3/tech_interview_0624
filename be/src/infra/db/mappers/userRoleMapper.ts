import { UserRole } from "@domain/enums/userRoleEnum";

export class UserRoleMapper {
    static toUserRole(role: string): UserRole {
        switch(role){
            case UserRole.ADMIN:
                return UserRole.ADMIN
            default:
                return UserRole.USER
        }
    }
}