import factory from '@adonisjs/lucid/factories'
import ProductImage from '#models/product_image'
import { ProductFactory } from '#database/factories/product_factory'

export const ProductImageFactory = factory
  .define(ProductImage, ({ faker }) => ({
    url: faker.image.url(),
    isPrimary: true,
    order: 0,
  }))
  .relation('product', () => ProductFactory)
  .build()
