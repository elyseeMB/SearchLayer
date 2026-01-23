import factory from '@adonisjs/lucid/factories'
import Brand from '#models/brand'
import { parseCsv } from '#helpers/csv'

export const BrandFactory = factory
  .define(Brand, async ({ faker }) => {
    const data = await parseCsv('products.csv')
    const item = faker.helpers.arrayElement(data)

    return {
      name: item.brand,
    }
  })
  .build()
