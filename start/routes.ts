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
import SearchesController from '#controllers/searches_controller'
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

router.get('/', [HomeController]).as('home')

router.get('/post', [PostsController]).as('post.index')

router.patch('/search', [SearchesController]).as('search')

router.get('posts/:slug', () => {}).as('posts.show')
