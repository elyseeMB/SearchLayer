import Post from '#models/post'
import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { IndexerInterface } from '../src/Infrastructure/Search/indexer_interface.js'
import { MappingNormalizer } from '#services/mapping_normalizer_service'

export default class Index extends BaseCommand {
  static commandName = 'app:index'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(indexer: IndexerInterface, normalizer: MappingNormalizer<Post>) {
    this.logger.info('Starting "indexing posts"')
    const posts = await Post.all()

    const doc = posts.map((post) => normalizer.mapper('POST', post))

    const res = await indexer.indexMultipleDocuments(doc)
    console.log(res)
    this.logger.success(`"success"`)
  }
}
