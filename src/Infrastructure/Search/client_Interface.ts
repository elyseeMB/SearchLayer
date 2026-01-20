export abstract class clientInterface<Response = any> {
  abstract get(endpoint: string): Promise<Response>

  abstract post(endpoint: string, data: Record<string, any> | string): Promise<Response | unknown>

  abstract patch(endpoint: string, data: any): Promise<Response | unknown>

  abstract deleteAll(endpoint: string): Promise<Response | unknown>
}
