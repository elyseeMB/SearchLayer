import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('asin', 50).notNullable().unique().index()
      table.string('parent_asin', 50).nullable().index()
      table.string('input_asin', 50).nullable()

      table.text('title').notNullable()
      table.text('description').nullable()
      table.string('model_number', 255).nullable()
      table.string('manufacturer', 255).nullable()
      table.string('department', 255).nullable()

      table.string('item_weight', 100).nullable()
      table.string('product_dimensions', 255).nullable()
      table.string('country_of_origin', 100).nullable()
      table.string('upc', 100).nullable()

      table.decimal('rating', 3, 2).nullable()
      table.integer('reviews_count').unsigned().defaultTo(0)
      table.integer('answered_questions').unsigned().defaultTo(0)
      table.string('bought_past_month', 100).nullable()

      table.integer('root_bs_rank').unsigned().nullable()
      table.string('root_bs_category', 255).nullable()
      table.string('bs_category', 255).nullable()
      table.string('bs_rank', 100).nullable()
      table.json('subcategory_rank').nullable()

      table.integer('images_count').unsigned().defaultTo(0)
      table.integer('video_count').unsigned().defaultTo(0)
      table.boolean('has_plus_content').defaultTo(false)
      table.boolean('has_video').defaultTo(false)

      table.string('availability', 100).nullable()
      table.boolean('is_available').defaultTo(true)
      table.string('badge', 100).nullable()
      table.string('amazon_choice', 255).nullable()

      table.date('date_first_available').nullable()
      table.string('domain', 255).nullable()
      table.text('url').nullable()
      table.text('origin_url').nullable()

      table
        .integer('brand_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('brands')
        .onDelete('SET NULL')
      table
        .integer('buybox_seller_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('sellers')
        .onDelete('SET NULL')
      table.integer('number_of_sellers').unsigned().defaultTo(1)

      table.timestamp('scraped_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true }).nullable()

      table.index(['brand_id', 'rating'])
      table.index('date_first_available')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
