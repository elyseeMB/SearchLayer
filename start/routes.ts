/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import PostsController from '#controllers/posts_controller'
import SearchesController from '#controllers/searches_controller'
import router from '@adonisjs/core/services/router'

router.get('/', [PostsController]).as('index')

router.patch('/search', [SearchesController]).as('search')

router.get('posts/:slug', () => {}).as('posts.show')
