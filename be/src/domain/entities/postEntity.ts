import { BaseEntity } from "@libs/common/class/base.entity"

export type PostEntityProps = {
    title:    string
    content:  string
    authorId: string
    creationDate: Date
}

export class PostEntity extends BaseEntity<PostEntityProps> {
  constructor(id: string, props: PostEntityProps) {
    super(id, props)
  }

  static from(id: string, props: PostEntityProps): PostEntity {
    return new PostEntity(id, props)
  }

  get title(): string {
    return this.props.title
  }

  get content(): string {
    return this.props.content
  }

  get authorId(): string {
    return this.props.authorId
  }

  get creationDate(): Date {
    return this.props.creationDate
  }
}
