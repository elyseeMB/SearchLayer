import type { ApplicationService } from '@adonisjs/core/types'
import env from '#start/env'
import { SearchInterface } from '../src/Infrastructure/Search/search_interface.js'
import { TypesenseClient } from '../src/Infrastructure/Search/Typesense/typesense_client.js'
import { IndexerInterface } from '../src/Infrastructure/Search/indexer_interface.js'
import { SearchManager } from '../src/Infrastructure/Search/search_manager.js'

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
