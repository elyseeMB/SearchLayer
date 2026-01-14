import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { TypesenseClient } from '../src/Infrastructure/Search/Typesense/typesense_client.js'
import { inject } from '@adonisjs/core'

export default class DropAllItemIndexable extends BaseCommand {
  static commandName = 'drop:all-item-indexable'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(client: TypesenseClient) {
    const res = await client.dropAll('/collections/content')
    console.log(res)
    this.logger.info('Hello world from "DropAllItemIndexable"')
  }
}
