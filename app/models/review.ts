import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number

  @column()
  declare reviewText: string

  @column()
  declare rating: number

  @column()
  declare helpfulCount: number

  @column()
  declare reviewerName: string

  @column()
  declare verifiedPurchase: boolean

  @column()
  declare isTopReview: boolean

  @column.dateTime()
  declare reviewDate: DateTime

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
