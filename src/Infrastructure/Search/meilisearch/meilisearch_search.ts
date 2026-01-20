import { inject } from '@adonisjs/core'
import { SearchInterface } from '../search_interface.js'
import { SearchResult } from '../search_result.js'
import { MeilisearchClient } from './meilisearch_client.js'
import { MeilisearchException } from './meilisearch_exception.js'
import { MeilisearchItem } from './meilisearch_item.js'

function addQuery(url: string, params: Record<string, any>) {
  if (!params) {
    return url
  }
  const search = Object.entries(params).reduce((acc, [key, value]) => {
    if (value || typeof value === 'number') {
      acc.set(key, value.toString())
    }
    return acc
  }, new URLSearchParams())

  return url + '?' + search
}

@inject()
export class MeilisearchSearch implements SearchInterface {
  constructor(private readonly client: MeilisearchClient) {}

  public async search(q: string): Promise<SearchResult> {
    try {
      const { totalHits, hits: items } = await this.client.post<'indexes/content/search'>(
        'indexes/content/search',
        {
          q,
          sort: ['created_at:desc'],
        }
      )

      return new SearchResult(
        items.map((item) => new MeilisearchItem(item)),
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
