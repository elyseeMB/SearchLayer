import { SearchResultItemInterface } from './search_resultItem_interface.js'

export class SearchResult {
  constructor(
    private readonly items: SearchResultItemInterface[],
    private readonly total: number
  ) {}

  public getItems(): SearchResultItemInterface[] {
    return this.items
  }

  public getTotal(): number {
    return this.total
  }
}
