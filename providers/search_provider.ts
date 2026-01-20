import type { ApplicationService } from '@adonisjs/core/types'
import env from '#start/env'
import { MeilisearchClient } from '#infrastructure/Search/meilisearch/meilisearch_client'
import { SearchManager } from '#infrastructure/Search/search_manager'
import { SearchInterface } from '#infrastructure/Search/search_interface'
import { IndexerInterface } from '#infrastructure/Search/indexer_interface'
import { TypesenseClient } from '#infrastructure/Search/Typesense/typesense_client'

export default class SearchProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton(SearchManager, () => new SearchManager(this.app))

    this.app.container.bind(SearchInterface, async () => {
      const manager = await this.app.container.make(SearchManager)
      return manager.search()
    })

    this.app.container.bind(IndexerInterface, async () => {
      const manager = await this.app.container.make(SearchManager)
      return manager.indexer()
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {
    this.app.container.bind(TypesenseClient, () => {
      const host = env.get('TYPESENSE_HOST')
      const apiKey = env.get('TYPESENSE_KEY')
      return new TypesenseClient(host, apiKey)
    })

    this.app.container.bind(MeilisearchClient, () => {
      const host = env.get('MEILISEARCH_HOST')
      const apiKey = env.get('MEILISEARCH_KEY')
      return new MeilisearchClient(host, apiKey)
    })
  }

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
