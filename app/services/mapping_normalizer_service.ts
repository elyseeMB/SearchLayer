import Post from '#models/post'
import { LucidModel } from '@adonisjs/lucid/types/model'
import { SearchDocument } from '../../src/Infrastructure/Search/search_document.js'
import { PostNormalizer } from '../../src/Infrastructure/Search/normalizer/posts_normalizer.js'

type FormatIndexer = 'POST' | 'TAXONOMY'

export abstract class NormalizerInterface {
  abstract normalize(): SearchDocument
}

export class MappingNormalizer<Model extends InstanceType<LucidModel>> {
  mapper(format: FormatIndexer, model: Model) {
    switch (format) {
      case 'POST':
        return new PostNormalizer(model as unknown as InstanceType<typeof Post>).normalize()

      default:
        throw new Error('Unexpected type for normalization')
    }
  }
}
