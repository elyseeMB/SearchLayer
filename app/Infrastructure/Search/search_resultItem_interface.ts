export abstract class SearchResultItemInterface {
  abstract getTitle(): string

  abstract getBody(): string

  abstract getDescription(): string

  abstract getUrl(): string

  abstract getCreatedAt(): Date
}
