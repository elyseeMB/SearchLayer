import { PostFactory } from '#database/factories/post_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import { ensureRelation } from '@adonisjs/lucid/utils'

export default class extends BaseSeeder {
  async run() {
    const trx = await db.transaction()

    try {
      await PostFactory.client(trx).createMany(100)
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      console.error('error seeder', error)
    }
  }
}
