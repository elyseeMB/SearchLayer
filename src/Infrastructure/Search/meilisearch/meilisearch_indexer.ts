import { inject } from '@adonisjs/core'
import { IndexerInterface } from '../indexer_interface.js'
import { SearchDocument } from '../search_document.js'
import { MeilisearchClient } from './meilisearch_client.js'
import { MeilisearchException } from './meilisearch_exception.js'

const COLLECTION_SCHEMA = {
  uid: 'content',
  primaryKey: 'id',
}

@inject()
export class MeilisearchIndexer implements IndexerInterface {
  constructor(private readonly client: MeilisearchClient) {
    this.createCollection()
    this.settings()
  }

  public async IndexSingleDocument(items: SearchDocument): Promise<void> {
    await this.client.patch(`indexes/${COLLECTION_SCHEMA['uid']}/documents/${items['id']}`, items)
  }

  public async indexMultipleDocuments(items: SearchDocument[]) {
    return this.client.post<'indexes/content/documents'>(
      `indexes/${COLLECTION_SCHEMA['uid']}/documents`,
      items
    )
  }

  private async createCollection() {
    try {
      await this.client.get(`indexes/${COLLECTION_SCHEMA['uid']}`)
    } catch (error) {
      if (error instanceof MeilisearchException && error.status === 404) {
        await this.client.post('indexes', COLLECTION_SCHEMA)
      }
    }
  }

  public async settings() {
    try {
      await this.client.patch(`indexes/${COLLECTION_SCHEMA['uid']}/settings`, {
        searchableAttributes: ['title', 'description'],
        sortableAttributes: ['created_at'],
      })
    } catch (error) {
      if (error instanceof MeilisearchException && error.status === 404) {
        console.error(error)
        new MeilisearchException(error.message)
        return
      }
    }
  }
}
