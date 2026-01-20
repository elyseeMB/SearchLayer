import { clientInterface } from '../client_Interface.js'
import { MeilisearchException } from './meilisearch_exception.js'

export type POSTResponse = {
  ['indexes/content/documents']: {
    taskUid: number
    indexUid: string
    status: string
    type: string
    enqueuedAt: string
  }

  ['indexes/content/search']: {
    hits: Record<string, any>[]
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

const methods = ['PUT', 'GET', 'POST', 'PATCH', 'DELETE', 'HEAD'] as const

export class MeilisearchClient implements clientInterface<SearchResponse> {
  constructor(
    private readonly host: string,
    private readonly apiKey: string
  ) {}

  public get(endpoint: string) {
    return this.api<SearchResponse>(endpoint, { method: 'GET', data: undefined })
  }

  public post<T extends keyof SearchResponse['/post']>(
    endpoint: string,
    data: Record<string, any> | string
  ): Promise<SearchResponse['/post'][T]> {
    return this.api<SearchResponse['/post'][T]>(endpoint, {
      method: 'POST',
      data,
    })
  }

  public deleteAll(endpoint: string) {
    return this.api(endpoint, { method: 'DELETE', data: {} })
  }

  public patch(endpoint: string, data: any) {
    return this.api(endpoint, { method: 'PATCH', data })
  }

  private async api<T>(
    endpoint: string,
    options: {
      data: Array<Record<string, any>> | Record<string, any> | string | undefined
      method: (typeof methods)[number]
      initialOptions?: RequestInit
    } = {
      method: 'POST',
      data: undefined,
      initialOptions: {},
    }
  ): Promise<T> {
    const url = new URL(endpoint, this.host)
    const isBodyAllowed = options.method !== 'GET' && options.method !== 'HEAD'
    let requestBody: string | undefined = undefined
    let contentType = 'application/json'

    if (isBodyAllowed && options.data !== undefined) {
      requestBody = JSON.stringify(options.data)
      contentType = 'application/json'
    }

    const fetchOptions: RequestInit = {
      method: options.method,
      headers: {
        ...options.initialOptions?.headers,
        'Content-Type': contentType,
        'Authorization': `Bearer ${this.apiKey}`,
      },
      credentials: 'include',
      ...options.initialOptions,
    }

    if (requestBody) {
      fetchOptions.body = requestBody
    }

    try {
      const response = await fetch(url, fetchOptions)
      if (!response.ok) {
        const res = await response.json()
        throw new MeilisearchException(res.message, {
          status: response.status,
          cause: url.toString(),
        })
      }
      return (await response.json()) as T
    } catch (error) {
      throw error
    }
  }
}
