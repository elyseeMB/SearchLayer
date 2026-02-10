import factory from '@adonisjs/lucid/factories'
import ProductDetail from '#models/product_detail'
import { ProductFactory } from '#database/factories/product_factory'

export const ProductDetailFactory = factory
  .define(ProductDetail, ({ faker }) => ({
    detailKey: 'Weight',
    detailValue: faker.commerce.productMaterial(),
  }))
  .relation('product', () => ProductFactory)
  .build()
