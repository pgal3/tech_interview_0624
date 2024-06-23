import { PostEntityProps } from "@domain/entities/postEntity"

type SearchableProps = Pick<Partial<PostEntityProps>, "authorId" | "title" | "authorName" | "creationDate"> & { from?: Date; to?: Date }

export class SearchablePostFields {
	private readonly props: SearchableProps

	constructor(props: SearchableProps) {
		this.props = props
	}

	get authorId(): string | undefined {
		return this.props.authorId
	}

	get authorName(): string | undefined {
		return this.props.authorName
	}

	get title(): string | undefined {
		return this.props.title
	}

	get creationDate(): Date | undefined {
		return this.props.creationDate
	}

	get from(): Date | undefined {
		return this.props.from
	}

	get to(): Date | undefined {
		return this.props.to
	}
}
