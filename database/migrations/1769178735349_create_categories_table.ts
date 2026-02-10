import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table
        .integer('parent_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
      table.integer('level').unsigned().defaultTo(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.index(['parent_id', 'level'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
