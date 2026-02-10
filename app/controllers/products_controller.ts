import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  static definitions = Product.build()

  async handle({ request, inertia }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const queryParams = request.qs()
    const sortData = queryParams.sort
      ? JSON.parse(queryParams.sort)
      : { field: 'title', sort: 'asc' }

    const enabledField = await ProductsController.definitions.EnabledField()

    const data = await Product.query()
      .select(enabledField.map((i) => i.key))
      .orderBy(sortData.field, sortData.order)
      .preload('categories')
      .preload('brand')
      .preload('seller')
      .preload('features')
      .preload('prices')
      .paginate(page, limit)

    return inertia.render('products/product_index', {
      products: data,
      columns: enabledField,
    })
  }
}
