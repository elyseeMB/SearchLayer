import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { inject } from '@adonisjs/core'
import { SearchManager } from '#infrastructure/Search/search_manager'
import { SEARCH_ENGINE, TYPE_SEARCH } from '#enums/search'

export default class DropAllItemIndexable extends BaseCommand {
  static commandName = 'flush:search'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(manager: SearchManager) {
    const engines = Object.values(SEARCH_ENGINE) as TYPE_SEARCH[]

    this.logger.info(`Starting...`)
    for (const engine of engines) {
      const indexer = await manager.indexer(engine)
      await indexer.flush()
      this.logger.success(`Delete completed ${engine}.`)
    }
  }
}
