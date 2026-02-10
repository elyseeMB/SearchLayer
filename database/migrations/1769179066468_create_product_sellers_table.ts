import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'product_sellers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
      table
        .integer('seller_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('sellers')
        .onDelete('CASCADE')
      table.decimal('price', 10, 2).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.unique(['product_id', 'seller_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
