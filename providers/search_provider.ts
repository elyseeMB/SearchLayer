import type { ApplicationService } from '@adonisjs/core/types'
import env from '#start/env'
import { SearchInterface } from '../src/Infrastructure/Search/search_interface.js'
import { TypesenseSearch } from '../src/Infrastructure/Search/Typesense/typesense_search.js'
import { TypesenseClient } from '../src/Infrastructure/Search/Typesense/typesense_client.js'
import { IndexerInterface } from '../src/Infrastructure/Search/indexer_interface.js'
import { TypesenseIndexer } from '../src/Infrastructure/Search/Typesense/typesense_indexer.js'

export default class SearchProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.bind(SearchInterface, () => this.app.container.make(TypesenseSearch))

    this.app.container.bind(IndexerInterface, () => this.app.container.make(TypesenseIndexer))
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
