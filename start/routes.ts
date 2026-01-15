/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import SearchesController from '#controllers/searches_controller'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home')

router.patch('/search', [SearchesController]).as('search')

router.get('posts/:slug', () => {}).as('posts.show')
