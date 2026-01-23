import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.text('title').notNullable()
      table.text('description').nullable()
      table.string('model_number', 255).nullable()

      table.decimal('rating', 3, 2).nullable()
      table.integer('reviews_count').unsigned().defaultTo(0)

      table.integer('root_bs_rank').unsigned().nullable()
      table.integer('images_count').unsigned().defaultTo(0)

      table.string('availability', 100).nullable()
      table.boolean('is_available').defaultTo(true)

      table.date('date_first_available').nullable()
      table.text('url').nullable()
      table.text('image_url').nullable()

      table
        .integer('brand_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('brands')
        .onDelete('SET NULL')
      table
        .integer('seller_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('sellers')
        .onDelete('SET NULL')

      table.timestamp('scraped_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.index(['brand_id', 'rating'])
      table.index('scraped_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
