import factory from '@adonisjs/lucid/factories'
import Review from '#models/review'
import { DateTime } from 'luxon'
import { ProductFactory } from '#database/factories/product_factory'

export const ReviewFactory = factory
  .define(Review, ({ faker }) => ({
    reviewText: faker.lorem.paragraph(),
    rating: faker.number.float({ min: 1, max: 5 }),
    helpfulCount: faker.number.int({ min: 0, max: 100 }),
    reviewerName: faker.person.fullName(),
    verifiedPurchase: faker.datatype.boolean(),
    isTopReview: faker.datatype.boolean(),
    reviewDate: DateTime.now().minus({ days: faker.number.int({ min: 1, max: 365 }) }),
  }))
  .relation('product', () => ProductFactory)
  .build()
