import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { SlugifyService } from '#services/slugify_service'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare pageTitle: string | null

  @column()
  declare description: string | null

  @column()
  declare body: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async slugifySlug(post: Post) {
    if (post.$dirty.title && !post.$dirty.slug && !post.slug) {
      post.slug = await SlugifyService.make<typeof Post>(Post, 'slug', post.title)
    }
  }
}
