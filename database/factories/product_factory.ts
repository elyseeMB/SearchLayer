import factory from '@adonisjs/lucid/factories'
import Product from '#models/product'
import { BrandFactory } from '#database/factories/brand_factory'
import { SellerFactory } from '#database/factories/seller_factory'

export const ProductFactory = factory
  .define(Product, () => ({}))
  .relation('brand', () => BrandFactory)
  .relation('seller', () => SellerFactory)
  .build()
