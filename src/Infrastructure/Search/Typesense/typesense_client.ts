import { TypesenseException } from './typesense_exception.js'

export type Document = {
  id: string
  title: string
  description: string
  body: string
  createdAt: number
  url: string
}

export type Highlight = {
  title?: {
    matched_tokens: string[]
    snippet: string
  }
}

export type HighlightDetail = {
  field: string
  matched_tokens: string[]
  snippet: string
}

export type TextMatchInfo = {
  best_field_score: string
  best_field_weight: number
  fields_matched: number
  num_tokens_dropped: number
  score: string
  tokens_matched: number
}

export type Hit = {
  document: Document
  highlight: Highlight
  highlights: HighlightDetail[]
  text_match: number
  text_match_info: TextMatchInfo
}

export type SearchResponse = {
  facet_counts: any[]
  found: number
  hits: Hit[]
  out_of: number
  page: number
  request_params: {
    collection_name: string
    first_q: string
    per_page: number
    q: string
  }
  search_cutoff: boolean
  search_time_ms: number
}

const methods = ['PUT', 'GET', 'POST', 'PATCH', 'DELETE', 'HEAD'] as const

export class TypesenseClient {
  constructor(
    private readonly host: string,
    private readonly apiKey: string
  ) {}

  public get(endpoint: string) {
    return this.api<SearchResponse>(endpoint, { method: 'GET', data: undefined })
  }

  public post(endpoint: string, data: Record<string, any> | string) {
    return this.api(endpoint, {
      method: 'POST',
      data,
    })
  }

  public dropAll(endpoint: string) {
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
      if (typeof options.data === 'string') {
        requestBody = options.data
        contentType = 'text/plain'
      } else {
        requestBody = JSON.stringify(options.data)
        contentType = 'application/json'
      }
    }

    const fetchOptions: RequestInit = {
      method: options.method,
      headers: {
        ...options.initialOptions?.headers,
        'Content-Type': contentType,
        'X-TYPESENSE-API-KEY': this.apiKey,
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
        throw new TypesenseException(res.message, {
          status: response.status,
          cause: url.toString(),
        })
      }

      if (endpoint.includes('/import')) {
        const text = await response.text()
        return text
          .split('\n')
          .filter((line) => line.trim())
          .map((line) => JSON.parse(line)) as any
      }

      return (await response.json()) as Promise<T>
    } catch (error) {
      throw error
    }
  }
}
