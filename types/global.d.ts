export type POSTResponse = {
  '/documents': {
    taskUid: number
    indexUid: string
    status: string
    type: string
    enqueuedAt: string
  }

  '/search': {
    hits: Array<{
      id: string
      title: string
      body: string
      description: string
      createdAt: number
      url: string
      _formatted: {
        id: string
        title: string
        body: string
        description: string
        createdAt: string
        url: string
      }
    }>
    offset: number
    limit: number
    estimatedTotalHits: number
    totalHits: number
    semanticHitCount?: number
    totalPages: number
    hitsPerPage: number
    page: number
    facetDistribution?: Record<string, Record<string, number>>
    facetStats?: Record<string, { min: number; max: number }>
    processingTimeMs: number
    query: string
    requestUid: string
  }
}

export type SearchResponse = {
  ['/post']: POSTResponse
  uid: string
  createdAt: string
  updatedAt: string
  primaryKey: string
}
