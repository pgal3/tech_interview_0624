type UpdatableProps = {
    username?: string
    email?: string
}

export class UpdatableUserInfo {
    private readonly props: UpdatableProps

    constructor(props: UpdatableProps){
        this.props = props
    }

    get username(): string | undefined {
        return this.props.username
    }

    get email(): string | undefined {
        return this.props.email
    }
}