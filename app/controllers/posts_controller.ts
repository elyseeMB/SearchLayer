import Post from '#models/post'
import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async handle({ inertia, request }: HttpContext) {
    // const items = await parseCsv('products.csv')
    // console.log(items)

    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const data = await Post.query().paginate(page, limit)
    const products = await Product.query()
      .preload('categories')
      .preload('brand')
      .preload('seller')
      .preload('features')
      .preload('prices')
      .paginate(page, limit)

    return inertia.render('home', {
      posts: data,
      products,
    })
  }
}
