import { SEARCH_ENGINE, TYPE_SEARCH } from '#enums/search'
import { SearchManager } from '#infrastructure/Search/search_manager'
import Post from '#models/post'
import { MappingNormalizer } from '#services/mapping_normalizer_service'
import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class Index extends BaseCommand {
  static commandName = 'app:index'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(manager: SearchManager, normalizer: MappingNormalizer<Post>) {
    this.logger.info('Starting global indexing')

    const engines = Object.values(SEARCH_ENGINE) as TYPE_SEARCH[]

    const posts = await Post.all()
    const documents = posts.map((post) => normalizer.mapper('POST', post))

    for (const engine of engines) {
      try {
        this.logger.await(`Indexing for: ${engine}`)
        console.log('++++++++++++++++++++++++++++++++++++++++++')
        console.log('++++++++++++++++++++++++++++++++++++++++++')
        console.log('++++++++++++++++++++++++++++++++++++++++++')
        console.log('++++++++++++++++++++++++++++++++++++++++++')
        const indexer = await manager.indexer(engine)
        const res = await indexer.indexMultipleDocuments(documents)
        console.log(res)
        this.logger.success(`success ${engine}`)
        console.log('++++++++++++++++++++++++++++++++++++++++++')
        console.log('++++++++++++++++++++++++++++++++++++++++++')
        console.log('++++++++++++++++++++++++++++++++++++++++++')
        console.log('++++++++++++++++++++++++++++++++++++++++++')
      } catch (e) {
        this.logger.error(`Error ${engine}: ${e.message}`)
      }
    }
  }
}
