import { POSTResponse } from 'types/global.js'
import { SearchResultItemInterface } from '../search_resultItem_interface.js'

export class MeilisearchItem implements SearchResultItemInterface {
  constructor(private readonly item: POSTResponse['/search']['hits'][number]) {}

  getTitle(): string {
    return this.item._formatted.title
  }

  getBody(): string {
    return this.item._formatted.body
  }

  getDescription(): string {
    return this.item._formatted.description
  }

  getUrl(): string {
    return this.item._formatted.url
  }

  getCreatedAt(): Date {
    return new Date(this.item.createdAt)
  }
}
