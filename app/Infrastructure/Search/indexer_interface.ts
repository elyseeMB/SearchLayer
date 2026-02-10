import { SearchDocument } from './search_document.js'

export abstract class IndexerInterface<T = unknown> {
  public abstract IndexSingleDocument(items: SearchDocument): Promise<T>
  public abstract indexMultipleDocuments(items: SearchDocument[]): Promise<T>
}
