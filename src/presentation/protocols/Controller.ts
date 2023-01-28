import { Request, Response } from './HttpProtocol'

export interface Controller {
  handle(request: Request): Promise<Response>
}
