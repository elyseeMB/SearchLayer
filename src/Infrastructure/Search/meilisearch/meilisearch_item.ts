import { SearchResultItemInterface } from '../search_resultItem_interface.js'
import { POSTResponse } from './meilisearch_client.js'

export class MeilisearchItem implements SearchResultItemInterface {
  constructor(private readonly item: POSTResponse['indexes/content/search']['hits'][number]) {
    console.log('MeilisearchItem++++++++++++++++++++++')
    console.log('MeilisearchItem++++++++++++++++++++++')
    console.log('MeilisearchItem++++++++++++++++++++++')
    console.log('MeilisearchItem++++++++++++++++++++++')
    console.log(item)
    console.log('MeilisearchItem++++++++++++++++++++++')
    console.log('MeilisearchItem++++++++++++++++++++++')
    console.log('MeilisearchItem++++++++++++++++++++++')
    console.log('MeilisearchItem++++++++++++++++++++++')
  }

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
