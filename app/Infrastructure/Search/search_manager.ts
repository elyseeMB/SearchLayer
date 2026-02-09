import { SEARCH_ENGINE, TYPE_SEARCH } from '#enums/search'
import env from '#start/env'
import type { ApplicationService } from '@adonisjs/core/types'
import { TypesenseClient } from './Typesense/typesense_client.js'
import { TypesenseIndexer } from './Typesense/typesense_indexer.js'
import { TypesenseSearch } from './Typesense/typesense_search.js'
import { MeilisearchClient } from './meilisearch/meilisearch_client.js'
import { MeilisearchIndexer } from './meilisearch/meilisearch_indexer.js'
import { MeilisearchSearch } from './meilisearch/meilisearch_search.js'
import { SearchInterface } from './contracts/search_interface.js'
import { IndexerInterface } from './contracts/indexer_interface.js'
import { ClientHttpInterface } from './clientHttp_Interface.js'

const registry = {
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

export class SearchManager {
  private searchDrivers: Map<TYPE_SEARCH, SearchInterface> = new Map()
  private indexerDrivers: Map<TYPE_SEARCH, IndexerInterface> = new Map()
  private clientDrivers: Map<TYPE_SEARCH, ClientHttpInterface> = new Map()

  constructor(protected app: ApplicationService) {}

  public get getEngine(): TYPE_SEARCH {
    return env.get('SEARCH_ENGINE') as TYPE_SEARCH
  }

  public async client(name?: TYPE_SEARCH): Promise<ClientHttpInterface> {
    return this.getDriver('client', this.clientDrivers, name)
  }

  public async register(name?: TYPE_SEARCH): Promise<SearchInterface> {
    return this.getDriver('search', this.searchDrivers, name)
  }

  public async indexer(name?: TYPE_SEARCH): Promise<IndexerInterface> {
    return this.getDriver('indexer', this.indexerDrivers, name)
  }

  private async getDriver<T>(
    type: 'search' | 'indexer' | 'client',
    cache: Map<TYPE_SEARCH, T>,
    name?: TYPE_SEARCH
  ): Promise<T> {
    const engine = name || this.getEngine

    if (cache.has(engine)) {
      return cache.get(engine)!
    }

    const driver = await this.resolve<T>(engine, type)
    cache.set(engine, driver)
    return driver
  }

  private async resolve<T>(engine: TYPE_SEARCH, type: 'search' | 'indexer' | 'client'): Promise<T> {
    const config = registry[engine]

    if (!config) {
      throw new Error(`${type} for "${engine}" not implemented`)
    }
    return (await this.app.container.make(config[type])) as T
  }
}
