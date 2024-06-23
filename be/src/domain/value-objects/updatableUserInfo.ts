import { UserEntityProps } from "@domain/entities/userEntity"

type UpdatableProps = Pick<Partial<UserEntityProps>, "username" | "email" | "picture">

export class UpdatableUserInfo {
	private readonly props: UpdatableProps

	constructor(props: UpdatableProps) {
		this.props = props
	}

	get username(): string | undefined {
		return this.props.username
	}

	get email(): string | undefined {
		return this.props.email
	}

	get picture(): string | undefined {
		return this.props.picture
	}
}
