import Post from '#models/post'
import Product from '#models/product'
import { ProductListPaginatorDefinition } from '#usecase/post/post-list-paginator-definition'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  static definitions = Post.build()

  async handle({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const queryParams = request.qs()
    const sortData = queryParams.sort
      ? JSON.parse(queryParams.sort)
      : { field: 'title', sort: 'asc' }

    const enabledField = await PostsController.definitions.EnabledField()

    const data = await Post.query()
      .select(enabledField.map((i) => i.key))
      .orderBy(sortData.field, sortData.order)
      .paginate(page, limit)

    const products = await Product.query()
      .preload('categories')
      .preload('brand')
      .preload('seller')
      .preload('features')
      .preload('prices')
      .orderBy('id', 'asc')
      .paginate(page, limit)

    return inertia.render('home', {
      posts: data,
      columns: enabledField,
      products,
    })
  }
}
