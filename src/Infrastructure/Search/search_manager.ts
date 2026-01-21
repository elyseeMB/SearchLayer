import { TypesenseSearch } from './Typesense/typesense_search.js'
import { SearchInterface } from './search_interface.js'
import env from '#start/env'
import type { ApplicationService } from '@adonisjs/core/types'
import { TypesenseIndexer } from './Typesense/typesense_indexer.js'
import { IndexerInterface } from './indexer_interface.js'
import { SEARCH_ENGINE, TYPE_SEARCH } from '#enums/search'
import { MeilisearchIndexer } from './meilisearch/meilisearch_indexer.js'
import { MeilisearchSearch } from './meilisearch/meilisearch_search.js'
import { clientInterface } from './clientHttp_Interface.js'
import { TypesenseClient } from './Typesense/typesense_client.js'
import { MeilisearchClient } from './meilisearch/meilisearch_client.js'

export class SearchManager {
  private searchDrivers: Map<TYPE_SEARCH, SearchInterface> = new Map()
  private indexerDrivers: Map<TYPE_SEARCH, IndexerInterface> = new Map()
  private clientDrivers: Map<TYPE_SEARCH, clientInterface> = new Map()

  constructor(protected app: ApplicationService) {}

  public get getEngine(): TYPE_SEARCH {
    return env.get('SEARCH_ENGINE') as TYPE_SEARCH
  }

  /**
   * client
   */
  public async client(name?: TYPE_SEARCH): Promise<clientInterface> {
    const engine = name || (env.get('SEARCH_ENGINE') as TYPE_SEARCH)
    if (this.clientDrivers.has(engine)) return this.clientDrivers.get(engine)!

    const { client } = await this.resolve(engine)
    this.clientDrivers.set(engine, client)
    return client
  }

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
   *
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
        client: TypesenseClient,
      },
      [SEARCH_ENGINE.MEILISEARCH]: {
        search: MeilisearchSearch,
        indexer: MeilisearchIndexer,
        client: MeilisearchClient,
      },
    }

    const config = driversConfig[engine]

    if (!config || !config.search || !config.indexer || !config.client) {
      throw new Error(`Search engine "${engine}" is not fully implemented.`)
    }

    const [search, indexer, client] = await Promise.all([
      this.app.container.make(config.search),
      this.app.container.make(config.indexer),
      this.app.container.make(config.client),
    ])

    return { search, indexer, client }
  }
}
