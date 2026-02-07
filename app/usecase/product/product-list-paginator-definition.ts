import Product from '#models/product'
import { BaseDefinition } from '../base_definition.js'

export class ProductListPaginatorDefinition extends BaseDefinition<typeof Product, Product> {
  private fieldConfig: Partial<{}> = {
    id: { label: 'ID', sortable: true },
    title: { label: 'Title', sortable: true },
    created_at: { label: 'createdAt', sortable: true },
    rating: { label: 'rating', sortable: true },
    brand_id: { label: 'BrandId', sortable: true },
    seller_id: { label: 'Seller Id', sortable: true },
    reviews_count: { label: 'reviewsCount', sortable: true },
    description: { label: 'description', sortable: true },
  }

  constructor() {
    super(Product)
  }

  static new() {
    return new ProductListPaginatorDefinition()
  }

  async EnabledField() {
    const collection = Object.entries(this.fieldConfig)
      .filter(([_, config]) => !config.hidden)
      .map(([key, config]) => ({
        key,
        ...config,
      }))

    console.log('++++++++++++++++++')
    console.log('++++++++++++++++++')
    console.log('++++++++++++++++++')
    console.log('++++++++++++++++++')
    console.log(collection)
    console.log('++++++++++++++++++')
    console.log('++++++++++++++++++')
    console.log('++++++++++++++++++')
    console.log('++++++++++++++++++')

    return collection
  }
}
