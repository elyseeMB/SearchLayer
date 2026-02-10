import Post from '#models/post'
import { BaseDefinition } from '../base_definition.js'

type FieldItem = {
  label: string
  sortable: boolean
  hidden?: boolean
}

type FieldConfig = {
  id: FieldItem
  title: FieldItem
  description: FieldItem
  page_title: FieldItem
  body: FieldItem
  created_at: FieldItem
  updated_at: FieldItem
}

export class PostListPaginatorDefinition extends BaseDefinition<typeof Post, Post> {
  private fieldConfig: FieldConfig = {
    id: { label: 'ID', sortable: true },
    title: { label: 'Title', sortable: true },
    description: { label: 'Description', sortable: false },
    page_title: { label: 'Page Title', sortable: false },
    body: { label: 'Body', sortable: false },
    created_at: { label: 'Created At', sortable: true },
    updated_at: { label: 'Updated At', sortable: true },
  }

  constructor() {
    super(Post)
  }

  static new() {
    return new PostListPaginatorDefinition()
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
