import factory from '@adonisjs/lucid/factories'
import ProductCategory from '#models/product_category'
import { ProductFactory } from '#database/factories/product_factory'
import { CategoryFactory } from '#database/factories/category_factory'

export const ProductCategoryFactory = factory
  .define(ProductCategory, async () => {
    return {}
  })
  .relation('product', () => ProductFactory)
  .relation('category', () => CategoryFactory)
  .build()
