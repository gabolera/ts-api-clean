import { MissingParamError } from '../../protocols/errors/MissingParamError'
import HttpResponse, { Request, Response } from '../../protocols/HttpProtocol'

export class SignUpController {
  handle(request: Request): Response {
    const requiredFields = ['email', 'name', 'password', 'confirm_password']

    for (const validField of requiredFields) {
      if (!request.body[validField]) {
        return HttpResponse.status(400).json(new MissingParamError(validField))
      }
    }

    return HttpResponse.status(200).json()
  }
}
