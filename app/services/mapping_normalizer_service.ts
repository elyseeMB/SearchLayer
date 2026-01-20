import { PostNormalizer } from '#infrastructure/Search/normalizer/posts_normalizer'
import { SearchDocument } from '#infrastructure/Search/search_document'
import Post from '#models/post'
import { LucidModel } from '@adonisjs/lucid/types/model'

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
