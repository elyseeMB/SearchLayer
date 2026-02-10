import factory from '@adonisjs/lucid/factories'
import DeliveryOption from '#models/delivery_option'
import { DateTime } from 'luxon'
import { ProductFactory } from '#database/factories/product_factory'

export const DeliveryOptionFactory = factory
  .define(DeliveryOption, ({ faker }) => ({
    optionText: faker.lorem.sentence(),
    estimatedDate: DateTime.now().plus({ days: faker.number.int({ min: 1, max: 7 }) }),
    isFastest: faker.datatype.boolean(),
  }))
  .relation('product', () => ProductFactory)
  .build()
