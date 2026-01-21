import { POSTResponse, SearchResponse } from 'types/global.js'
import { ClientHttpInterface } from '../clientHttp_Interface.js'
import { MeilisearchException } from './meilisearch_exception.js'

const methods = ['PUT', 'GET', 'POST', 'PATCH', 'DELETE', 'HEAD'] as const

export class MeilisearchClient implements ClientHttpInterface<SearchResponse> {
  constructor(
    private readonly host: string,
    private readonly apiKey: string
  ) {}

  public get(endpoint: string) {
    return this.api<SearchResponse>(endpoint, { method: 'GET', data: undefined })
  }

  public post<T extends keyof POSTResponse>(
    endpoint: string,
    data: Record<string, any> | string
  ): Promise<POSTResponse[T]> {
    return this.api<POSTResponse[T]>(endpoint, {
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
