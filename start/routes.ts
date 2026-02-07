/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import HomeController from '#controllers/home_controller'
import PostsController from '#controllers/posts_controller'
import ProductsController from '#controllers/products_controller'
import SearchesController from '#controllers/searches_controller'
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

router.get('/', [HomeController]).as('home')

router.get('/post', [PostsController]).as('post.index')
router.get('/product', [ProductsController]).as('product.index')

router.patch('/search', [SearchesController]).as('search')

router.get('posts/:slug', () => {}).as('posts.show')
