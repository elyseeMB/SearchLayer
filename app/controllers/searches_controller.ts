import type { HttpContext } from '@adonisjs/core/http'
import { SearchInterface } from '../../src/Infrastructure/Search/search_interface.js'
import { inject } from '@adonisjs/core'

export default class SearchesController {
  @inject()
  async handle({ response, request }: HttpContext, search: SearchInterface) {
    const q = request.qs().q ?? ''
    const redirect = request.qs().redirect ?? '1'

    if (q && redirect !== '0') {
      console.log('==========================')
      console.log('handle....')
      console.log('==========================')
    }

    const results = await search.search(q)

    return response.json(results.getItems())
  }
}
