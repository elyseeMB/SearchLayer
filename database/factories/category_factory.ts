import factory from '@adonisjs/lucid/factories'
import Category from '#models/category'
import { parseCsv } from '#helpers/csv'

export const CategoryFactory = factory
  .define(Category, async ({ faker }) => {
    const data = await parseCsv('products.csv')
    const item = faker.helpers.arrayElement(data)
    const categories = JSON.parse(item.categories || '[]')
    const name = categories[0] || faker.commerce.department()

    return {
      name: name,
      parentId: null,
      level: 0,
    }
  })
  .relation('parent', () => CategoryFactory)
  .build()
