import factory from '@adonisjs/lucid/factories'
import ProductVariation from '#models/product_variation'
import { ProductFactory } from '#database/factories/product_factory'

export const ProductVariationFactory = factory
  .define(ProductVariation, ({ faker }) => ({
    name: faker.color.human(),
    variationType: 'color',
  }))
  .relation('product', () => ProductFactory)
  .build()
