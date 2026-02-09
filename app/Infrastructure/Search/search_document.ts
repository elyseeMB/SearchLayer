type SearchDocumentProps = {
  id: string
  title: string
  body: string
  description: string
  createdAt: number
  slug: string
}

export class SearchDocument {
  //@ts-ignore It's initialize
  public id: string

  //@ts-ignore It's initialize
  public title: string

  //@ts-ignore It's initialize
  public body: string

  //@ts-ignore It's initialize
  public description: string

  //@ts-ignore It's initialize
  public createdAt: number

  public url: string

  constructor(item: SearchDocumentProps) {
    this.id = item.id.toString()
    this.title = item.title
    this.body = item.body
    this.description = item.description
    this.createdAt = item.createdAt
    this.url = item.slug
  }
}
