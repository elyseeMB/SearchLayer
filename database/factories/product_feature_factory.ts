import factory from '@adonisjs/lucid/factories'
import ProductFeature from '#models/product_feature'
import { ProductFactory } from '#database/factories/product_factory'

export const ProductFeatureFactory = factory
  .define(ProductFeature, ({ faker }) => ({
    featureText: faker.lorem.sentence(),
    order: 0,
  }))
  .relation('product', () => ProductFactory)
  .build()
