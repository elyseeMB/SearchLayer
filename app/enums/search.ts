export const SEARCH_ENGINE = {
  TYPESENSE: 'typesense',
  MEILISEARCH: 'meilisearch',
} as const

export type TYPE_SEARCH = (typeof SEARCH_ENGINE)[keyof typeof SEARCH_ENGINE]
