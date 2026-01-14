import { inject } from '@adonisjs/core'
import { IndexerInterface } from '../indexer_interface.js'
import { SearchDocument } from '../search_document.js'
import { TypesenseClient } from './typesense_client.js'
import { TypesenseException } from './typesense_exception.js'

const COLLECTION_SCHEMA = {
  name: 'content',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'body',
      type: 'string',
    },
    {
      name: 'description',
      type: 'string',
    },
    {
      name: 'createdAt',
      type: 'int32',
    },
    {
      name: 'url',
      type: 'string',
    },
  ],
  default_sorting_field: 'createdAt',
}

@inject()
export class TypesenseIndexer implements IndexerInterface {
  constructor(private readonly client: TypesenseClient) {
    this.createCollection()
  }

  public async IndexSingleDocument(items: SearchDocument): Promise<void> {
    await this.client.patch(`collections/content/documents/${items['id']}`, items)
  }

  public async indexMultipleDocuments(items: SearchDocument[]): Promise<void> {
    const doc = items.map((item) => JSON.stringify(item)).join('\n')
    return await this.client.post(
      `collections/content/documents/import?action=create&return_id=true`,
      doc
    )
  }

  private async createCollection() {
    try {
      await this.client.get('collections/content')
    } catch (error) {
      if (error instanceof TypesenseException && error.status === 404) {
        await this.client.post('collections', COLLECTION_SCHEMA)
      }
    }
  }
}
