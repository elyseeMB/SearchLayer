import { SearchResult } from './search_result.js'

export abstract class SearchInterface {
  public abstract search(q: string): Promise<SearchResult>
}
