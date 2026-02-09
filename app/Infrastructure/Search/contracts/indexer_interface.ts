import { SearchDocument } from '../search_document.js'

export abstract class IndexerInterface<T = unknown> {
  public abstract indexSingleDocument(items: SearchDocument): Promise<T>
  public abstract indexMultipleDocuments(items: SearchDocument[]): Promise<T>
  public abstract flush(): Promise<any>
}
