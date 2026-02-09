import Post from '#models/post'
import { NormalizerInterface } from '#services/mapping_normalizer_service'
import { SearchDocument } from '../search_document.js'
import env from '#start/env'

export class PostNormalizer implements NormalizerInterface {
  constructor(private readonly model: Post) {}

  normalize(): SearchDocument {
    if (!(this.model instanceof Post)) {
      throw new Error('Unexpected type for normalization, expected Course, got', {
        cause: this.model,
      })
    }

    return new SearchDocument({
      id: this.model.id.toString(),
      title: this.model.title,
      description: this.model.description ?? '',
      body: this.model.body ?? '',
      createdAt: new Date(this.model.createdAt.toISO()!).getTime(),
      slug: this.buildUrlWithSlug(this.model.slug),
    })
  }

  buildUrlWithSlug(slug: string): string {
    const baseUrl = env.get('APP_URL')
    return `${baseUrl}/posts/${slug}`
  }
}
