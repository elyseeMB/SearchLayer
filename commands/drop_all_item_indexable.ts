import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { inject } from '@adonisjs/core'
import { SearchManager } from '#infrastructure/Search/search_manager'
import { SEARCH_ENGINE, TYPE_SEARCH } from '#enums/search'

export default class DropAllItemIndexable extends BaseCommand {
  static commandName = 'drop:all-item-indexable'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(manager: SearchManager) {
    const engine = manager.getEngine as TYPE_SEARCH

    const deleteAll = {
      [SEARCH_ENGINE.TYPESENSE]: async () => {
        const client = await manager.client(SEARCH_ENGINE.TYPESENSE)
        const res = await client.deleteAll('/collections/content')
        console.log(res)
        this.logger.info(`Drop all item with ${SEARCH_ENGINE.TYPESENSE}`)
      },

      [SEARCH_ENGINE.MEILISEARCH]: async () => {
        const client = await manager.client(SEARCH_ENGINE.MEILISEARCH)
        const res = await client.deleteAll('/indexes/content')
        console.log(res)
        this.logger.info(`Drop all item with ${SEARCH_ENGINE.MEILISEARCH}`)
      },
    }

    await deleteAll[engine]()
  }
}
