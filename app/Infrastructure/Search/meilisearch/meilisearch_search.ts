import { inject } from '@adonisjs/core'
import { SearchInterface } from '../contracts/search_interface.js'
import { SearchResult } from '../search_result.js'
import { MeilisearchClient } from './meilisearch_client.js'
import { MeilisearchException } from './meilisearch_exception.js'
import { MeilisearchItem } from './meilisearch_item.js'

@inject()
export class MeilisearchSearch implements SearchInterface {
  constructor(private readonly client: MeilisearchClient) {}

  public async search(q: string): Promise<SearchResult> {
    try {
      const { totalHits, hits: items } = await this.client.post<'/search'>(
        'indexes/content/search',
        {
          q,
          sort: ['created_at:desc'],
          attributesToHighlight: ['title', 'description'],
          attributesToCrop: ['body'],
          highlightPreTag: '<span class="bg-yellow-200 text-yellow-900 px-1 rounded">',
          highlightPostTag: '</span>',
        }
      )

      return new SearchResult(
        items.map((item) => ({ ...new MeilisearchItem(item._formatted).item })),
        totalHits
      )
    } catch (error) {
      if (error instanceof MeilisearchException) {
        throw error
      }
      throw error
    }
  }
}
