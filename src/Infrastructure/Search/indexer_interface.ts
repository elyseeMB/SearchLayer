import { SearchDocument } from './search_document.js'

export abstract class IndexerInterface {
  public abstract IndexSingleDocument(items: SearchDocument): Promise<void>
  public abstract indexMultipleDocuments(items: SearchDocument[]): Promise<void>
}
