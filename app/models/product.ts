import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Brand from '#models/brand'
import Seller from '#models/seller'
import Price from '#models/price'
import ProductFeature from '#models/product_feature'
import Category from '#models/category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare modelNumber: string | null

  @column()
  declare rating: number | null

  @column()
  declare reviewsCount: number

  @column()
  declare rootBsRank: number | null

  @column()
  declare imagesCount: number

  @column()
  declare availability: string | null

  @column()
  declare isAvailable: boolean

  @column.dateTime()
  declare dateFirstAvailable: DateTime | null

  @column()
  declare url: string | null

  @column()
  declare imageUrl: string | null

  @column()
  declare brandId: number | null

  @column()
  declare sellerId: number | null

  @column.dateTime()
  declare scrapedAt: DateTime | null

  @belongsTo(() => Brand)
  declare brand: BelongsTo<typeof Brand>

  @belongsTo(() => Seller)
  declare seller: BelongsTo<typeof Seller>

  @hasMany(() => Price)
  declare prices: HasMany<typeof Price>

  @hasMany(() => ProductFeature)
  declare features: HasMany<typeof ProductFeature>

  @manyToMany(() => Category, {
    pivotTable: 'product_categories',
    pivotForeignKey: 'product_id',
    pivotRelatedForeignKey: 'category_id',
  })
  declare categories: ManyToMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
