import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

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
      table.text('review_text').notNullable()
      table.decimal('rating', 3, 2).notNullable()
      table.integer('helpful_count').unsigned().defaultTo(0)
      table.string('reviewer_name', 255).nullable()
      table.boolean('verified_purchase').defaultTo(false)
      table.boolean('is_top_review').defaultTo(false)
      table.date('review_date').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.index(['product_id', 'rating'])
      table.index(['product_id', 'is_top_review'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
