import Post from '#models/post'
import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { MappingNormalizer } from '#services/mapping_normalizer_service'
import { SEARCH_ENGINE } from '#enums/search'
import { SearchManager } from '#infrastructure/Search/search_manager'
import { TypesenseIndexer } from '#infrastructure/Search/Typesense/typesense_indexer'
import { MeilisearchIndexer } from '#infrastructure/Search/meilisearch/meilisearch_indexer'

export default class Index extends BaseCommand {
  static commandName = 'app:index'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(manager: SearchManager, normalizer: MappingNormalizer<Post>) {
    this.logger.info('Starting "indexing posts"')
    const indexer = manager.getEngine

    const command = {
      [SEARCH_ENGINE.TYPESENSE]: async () => {
        const posts = await Post.all()
        const doc = posts.map((post) => normalizer.mapper('POST', post))
        const indexer = await manager.indexer(SEARCH_ENGINE.TYPESENSE)
        const res = await indexer.indexMultipleDocuments(doc)
        console.log('+++++++++++++++++++')
        console.log('+++++++++++++++++++')
        console.log('+++++++++++++++++++')
        console.log('+++++++++++++++++++')
        console.log('typesense')
        console.log('typesense')
        console.log('typesense')
        console.log(res)
        console.log('typesense')
        console.log('typesense')
        console.log('typesense')
        console.log('+++++++++++++++++++')
        console.log('+++++++++++++++++++')
        console.log('+++++++++++++++++++')
        console.log('+++++++++++++++++++')
        this.logger.success(`"success"`)
      },

      [SEARCH_ENGINE.MEILISEARCH]: async () => {
        const posts = await Post.all()
        const doc = posts.map((post) => normalizer.mapper('POST', post))

        const indexer = await manager.indexer(SEARCH_ENGINE.MEILISEARCH)
        const res = await indexer.indexMultipleDocuments(doc)
        console.log('+++++++++++++++++++')
        console.log('+++++++++++++++++++')
        console.log('+++++++++++++++++++')
        console.log('+++++++++++++++++++')
        console.log('meilisearch')
        console.log('meilisearch')
        console.log('meilisearch')
        console.log(res)
        console.log('meilisearch')
        console.log('meilisearch')
        console.log('meilisearch')
        console.log('+++++++++++++++++++')
        console.log('+++++++++++++++++++')
        console.log('+++++++++++++++++++')
        console.log('+++++++++++++++++++')
        this.logger.success(`"success"`)
      },
    }

    await command[indexer]()
  }
}
