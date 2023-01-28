import { Request, Response, HttpResponse, Controller } from './SignUpProtocols'
import { EmailValidator } from '../../protocols/EmailValidator'
import { MissingParamError, InvalidParamError } from '../../errors'

interface SignUpControllerDependencies {
  signUpRepository?: any
  emailValidator: EmailValidator
}

export class SignUpController implements Controller {
  private readonly signUpRepository: any
  private readonly emailValidator: EmailValidator
  constructor({
    signUpRepository,
    emailValidator,
  }: SignUpControllerDependencies) {
    this.signUpRepository = signUpRepository
    this.emailValidator = emailValidator
  }
  async handle(request: Request): Promise<Response> {
    try {
      const requiredFields = ['email', 'name', 'password', 'confirm_password']

      for (const validField of requiredFields) {
        if (!request.body[validField]) {
          return HttpResponse.badRequest(new MissingParamError(validField))
        }
      }

      if (request.body.password !== request.body.confirm_password) {
        return HttpResponse.badRequest(new InvalidParamError('passwords'))
      }

      const validEmail = this.emailValidator.verify(request.body.email)
      if (!validEmail) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }

      return HttpResponse.status(200).send()
    } catch (err: any) {
      return HttpResponse.serverError({ message: 'Internal Server Error' })
    }
  }
}
