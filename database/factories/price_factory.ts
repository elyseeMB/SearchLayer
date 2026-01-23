import factory from '@adonisjs/lucid/factories'
import Price from '#models/price'
import { DateTime } from 'luxon'
import { ProductFactory } from '#database/factories/product_factory'

export const PriceFactory = factory
  .define(Price, ({ faker }) => ({
    initialPrice: faker.number.float({ min: 10, max: 1000 }),
    finalPrice: faker.number.float({ min: 10, max: 1000 }),
    discount: faker.number.int({ min: 0, max: 50 }).toString() + '%',
    currency: 'USD',
    priceDate: DateTime.now(),
  }))
  .relation('product', () => ProductFactory)
  .build()
