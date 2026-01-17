import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { SearchManager } from '../../src/Infrastructure/Search/search_manager.js'
import { SEARCH_ENGINE } from '#enums/search'

export default class SearchesController {
  @inject()
  async handle({ response, request }: HttpContext, manager: SearchManager) {
    const q = request.qs().q ?? ''
    const redirect = request.qs().redirect ?? '1'

    if (q && redirect !== '0') {
      console.log('==========================')
      console.log('handle....')
      console.log('==========================')
    }

    const search = await manager.search(SEARCH_ENGINE.TYPESENSE)

    const results = await search.search(q)

    return response.json(results.getItems())
  }
}
