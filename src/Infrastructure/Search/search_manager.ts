import { TypesenseSearch } from './Typesense/typesense_search.js'
import { SearchInterface } from './search_interface.js'
import env from '#start/env'
import type { ApplicationService } from '@adonisjs/core/types'
import { TypesenseIndexer } from './Typesense/typesense_indexer.js'
import { IndexerInterface } from './indexer_interface.js'
import { SEARCH_ENGINE, TYPE_SEARCH } from '#enums/search'

export class SearchManager {
  private searchDrivers: Map<TYPE_SEARCH, SearchInterface> = new Map()
  private indexerDrivers: Map<TYPE_SEARCH, IndexerInterface> = new Map()

  constructor(protected app: ApplicationService) {}

  /**
   * search
   */
  public async search(name?: TYPE_SEARCH): Promise<SearchInterface> {
    const engine = name || (env.get('SEARCH_ENGINE') as TYPE_SEARCH)
    if (this.searchDrivers.has(engine)) return this.searchDrivers.get(engine)!

    const { search } = await this.resolve(engine)
    this.searchDrivers.set(engine, search)
    return search
  }

  /**
   * indexer
   */
  public async indexer(name?: TYPE_SEARCH): Promise<IndexerInterface> {
    const engine = name || (env.get('SEARCH_ENGINE') as TYPE_SEARCH)
    if (this.indexerDrivers.has(engine)) return this.indexerDrivers.get(engine)!

    const { indexer } = await this.resolve(engine)
    this.indexerDrivers.set(engine, indexer)
    return indexer
  }

  private async resolve(engine: TYPE_SEARCH) {
    const driversConfig = {
      [SEARCH_ENGINE.TYPESENSE]: {
        search: TypesenseSearch,
        indexer: TypesenseIndexer,
      },
      [SEARCH_ENGINE.MEILISEARCH]: {
        search: null,
        indexer: null,
      },
    }

    const config = driversConfig[engine]

    if (!config || !config.search || !config.indexer) {
      throw new Error(`Search engine "${engine}" is not fully implemented.`)
    }

    const [search, indexer] = await Promise.all([
      this.app.container.make(config.search),
      this.app.container.make(config.indexer),
    ])

    return { search, indexer }
  }
}
