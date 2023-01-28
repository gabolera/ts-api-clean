import HttpResponse, { Request, Response } from '../../protocols/HttpProtocol'
import { EmailValidator } from './protocols/EmailValidator'
import { MissingParamError, InvalidParamError } from '../../errors'

interface SignUpControllerDependencies {
  signUpRepository?: any
  emailValidator: EmailValidator
}

export class SignUpController {
  private readonly signUpRepository: any
  private readonly emailValidator: EmailValidator
  constructor({
    signUpRepository,
    emailValidator,
  }: SignUpControllerDependencies) {
    this.signUpRepository = signUpRepository
    this.emailValidator = emailValidator
  }
  handle(request: Request): Response {
    try {
      const requiredFields = ['email', 'name', 'password', 'confirm_password']

      for (const validField of requiredFields) {
        if (!request.body[validField]) {
          return HttpResponse.status(400).send(
            new MissingParamError(validField)
          )
        }
      }

      const validEmail = this.emailValidator.verify(request.body.email)
      if (!validEmail) {
        return HttpResponse.status(400).send(new InvalidParamError('email'))
      }

      return HttpResponse.status(200).send()
    } catch (err: any) {
      return HttpResponse.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
