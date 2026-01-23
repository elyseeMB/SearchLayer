import factory from '@adonisjs/lucid/factories'
import ProductSeller from '#models/product_seller'
import { ProductFactory } from '#database/factories/product_factory'
import { SellerFactory } from '#database/factories/seller_factory'

export const ProductSellerFactory = factory
  .define(ProductSeller, ({ faker }) => ({
    price: faker.number.float({ min: 10, max: 100 }),
  }))
  .relation('product', () => ProductFactory)
  .relation('seller', () => SellerFactory)
  .build()
