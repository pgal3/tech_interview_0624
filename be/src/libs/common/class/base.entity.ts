export abstract class BaseEntity<T extends object> {
  readonly id: string
  protected readonly props: T

  constructor(id: string, props: T) {
    this.id = id
    this.props = props
  }
}
