import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async handle({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const data = await Post.query().paginate(page, limit)
    return inertia.render('home', {
      posts: data,
    })
  }
}
