import { inject } from '@adonisjs/core'
import { SearchInterface } from '../search_interface.js'
import { SearchResult } from '../search_result.js'
import { TypesenseClient } from './typesense_client.js'
import { TypesenseException } from './typesense_exception.js'
import { TypesenseItem } from './typesense_item.js'

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
export class TypesenseSearch implements SearchInterface {
  constructor(private readonly client: TypesenseClient) {}

  public async search(q: string): Promise<SearchResult> {
    const url = addQuery('collections/content/documents/search', {
      q,
      query_by: 'title',
      // per_page: 1,
    })
    try {
      const { found, hits: items } = await this.client.get(url)

      console.log(items)
      return new SearchResult(
        items.map((item) => new TypesenseItem(item)),
        found
      )
    } catch (error) {
      if (error instanceof TypesenseException) {
        throw error
      }
      throw error
    }
  }
}
