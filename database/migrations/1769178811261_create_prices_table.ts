import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'prices'

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

      table.decimal('initial_price', 10, 2).nullable()
      table.decimal('final_price', 10, 2).nullable()
      table.string('discount', 20).nullable()
      table.string('currency', 10).defaultTo('USD')
      table.json('prices_breakdown').nullable()
      table.json('buybox_prices').nullable()

      table.timestamp('price_date', { useTz: true }).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.index(['product_id', 'price_date'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
