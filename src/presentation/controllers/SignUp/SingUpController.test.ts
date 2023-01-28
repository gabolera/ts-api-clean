import { describe, expect, test, vitest } from 'vitest'
import { SignUpController } from './SignUpController'
import { InvalidParamError, MissingParamError } from '../../errors'
import { EmailValidator } from './protocols/EmailValidator'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    public isValid = true
    verify(email: string): boolean {
      return this.isValid
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  // const signUpRepository = new signUpRepository()
  const sut = new SignUpController({ emailValidator: emailValidatorStub })

  return {
    sut,
    emailValidatorStub,
  }
}

describe('SignUp Controller Test ', () => {
  test('should be 400 if email is not provided', () => {
    const request = {
      body: {
        name: 'any_name',
        password: 'any_password',
        confirm_password: 'any_confirm_password',
      },
    }
    const { sut } = makeSut()
    const response = sut.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.data).toEqual(new MissingParamError('email'))
  })

  test('should be 400 if name is not provided', () => {
    const request = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        confirm_password: 'any_confirm_password',
      },
    }
    const { sut } = makeSut()
    const response = sut.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.data).toEqual(new MissingParamError('name'))
  })

  test('should be 400 if password is not provided', () => {
    const request = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        confirm_password: 'any_confirm_password',
      },
    }
    const { sut } = makeSut()
    const response = sut.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.data).toEqual(new MissingParamError('password'))
  })

  test('should be 400 if confirm_password is not provided', () => {
    const request = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
      },
    }
    const { sut } = makeSut()
    const response = sut.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.data).toEqual(new MissingParamError('confirm_password'))
  })

  test('should be 400 if email is invalid param', () => {
    const request = {
      body: {
        email: 'invalid_email#mail.com',
        name: 'any_name',
        password: 'any_password',
        confirm_password: 'any_password',
      },
    }
    const { sut, emailValidatorStub } = makeSut()
    vitest.spyOn(emailValidatorStub, 'verify').mockReturnValueOnce(false)
    const response = sut.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.data).toEqual(new InvalidParamError('email'))
  })
})
