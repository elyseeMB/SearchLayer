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

export class SearchManager {
  private searchDrivers: Map<TYPE_SEARCH, SearchInterface> = new Map()
  private indexerDrivers: Map<TYPE_SEARCH, IndexerInterface> = new Map()
  private clientDrivers: Map<TYPE_SEARCH, ClientHttpInterface> = new Map()

  private readonly registry = {
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

  constructor(protected app: ApplicationService) {}

  public get getEngine(): TYPE_SEARCH {
    return env.get('SEARCH_ENGINE') as TYPE_SEARCH
  }

  public async client(name?: TYPE_SEARCH): Promise<ClientHttpInterface> {
    const engine = name || this.getEngine
    if (this.clientDrivers.has(engine)) {
      return this.clientDrivers.get(engine)!
    }

    const client = await this.resolve<ClientHttpInterface>(engine, 'client')
    this.clientDrivers.set(engine, client)
    return client
  }

  public async register(name?: TYPE_SEARCH): Promise<SearchInterface> {
    const engine = name || this.getEngine
    if (this.searchDrivers.has(engine)) {
      return this.searchDrivers.get(engine)!
    }

    const search = await this.resolve<SearchInterface>(engine, 'search')
    this.searchDrivers.set(engine, search)
    return search
  }

  public async indexer(name?: TYPE_SEARCH): Promise<IndexerInterface> {
    const engine = name || this.getEngine
    if (this.indexerDrivers.has(engine)) {
      return this.indexerDrivers.get(engine)!
    }

    const indexer = await this.resolve<IndexerInterface>(engine, 'indexer')
    this.indexerDrivers.set(engine, indexer)
    return indexer
  }

  private async resolve<T>(engine: TYPE_SEARCH, type: 'search' | 'indexer' | 'client'): Promise<T> {
    const config = this.registry[engine]

    if (!config) {
      throw new Error(`${type} for "${engine}" not implemented`)
    }

    return (await this.app.container.make(config[type])) as T
  }
}
