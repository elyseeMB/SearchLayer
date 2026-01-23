import factory from '@adonisjs/lucid/factories'
import Seller from '#models/seller'
import { parseCsv } from '#helpers/csv'

export const SellerFactory = factory
  .define(Seller, async ({ faker }) => {
    const data = await parseCsv('products.csv')
    const item = faker.helpers.arrayElement(data)

    return {
      sellerId: item.seller_id,
      sellerName: item.seller_name,
    }
  })
  .build()
