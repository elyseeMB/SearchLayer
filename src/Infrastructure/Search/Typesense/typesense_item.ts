import { SearchResultItemInterface } from '../search_resultItem_interface.js'
import { Hit } from './typesense_client.js'

export class TypesenseItem implements SearchResultItemInterface {
  constructor(private readonly item: Hit) {}

  getTitle(): string {
    return this.item.document.title
  }

  getBody(): string {
    return this.item.document.body
  }

  getDescription(): string {
    return this.item.document.description
  }

  getUrl(): string {
    return this.item.document.url
  }

  getCreatedAt(): Date {
    return new Date(this.item.document.createdAt)
  }
}
