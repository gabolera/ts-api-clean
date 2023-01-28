import { describe, expect, test, vitest } from 'vitest'
import { SignUpController } from './SignUpController'
import { InvalidParamError, MissingParamError } from '../../errors'
import { EmailValidator } from './SignUpProtocols'

const emailValidatorFactory = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    public isValid = true
    verify(email: string): boolean {
      return this.isValid
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = emailValidatorFactory()
  // const signUpRepository = new signUpRepository()
  const sut = new SignUpController({ emailValidator: emailValidatorStub })

  return {
    sut,
    emailValidatorStub,
  }
}

describe('SignUp Controller Test ', () => {
  test('should return 400 if email is not provided', async () => {
    const request = {
      body: {
        name: 'any_name',
        password: 'any_password',
        confirm_password: 'any_confirm_password',
      },
    }
    const { sut } = makeSut()
    const response = await sut.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.data).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if name is not provided', async () => {
    const request = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        confirm_password: 'any_confirm_password',
      },
    }
    const { sut } = makeSut()
    const response = await sut.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.data).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if password is not provided', async () => {
    const request = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        confirm_password: 'any_confirm_password',
      },
    }
    const { sut } = makeSut()
    const response = await sut.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.data).toEqual(new MissingParamError('password'))
  })

  test('should return 400 if confirm_password is not provided', async () => {
    const request = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
      },
    }
    const { sut } = makeSut()
    const response = await sut.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.data).toEqual(new MissingParamError('confirm_password'))
  })

  test('should return 400 if password confirm not match', async () => {
    const request = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        confirm_password: 'any_password22',
      },
    }
    const { sut } = makeSut()
    const response = await sut.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.data).toEqual(new InvalidParamError('passwords'))
  })

  test('should return 400 if is invalid email', async () => {
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
    const response = await sut.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.data).toEqual(new InvalidParamError('email'))
  })

  test('should call EmailValidator with correct email', async () => {
    const request = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        confirm_password: 'any_password',
      },
    }
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = vitest
      .spyOn(emailValidatorStub, 'verify')
      .mockReturnValueOnce(false)
    await sut.handle(request)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    vitest.spyOn(emailValidatorStub, 'verify').mockImplementationOnce(() => {
      throw new Error('Erro inesperado!')
    })

    const request = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        confirm_password: 'any_password',
      },
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toEqual(500)
  })

  test.skip('should AddAccount is called', async () => {
    const { sut, emailValidatorStub } = makeSut()
    vitest.spyOn(emailValidatorStub, 'verify').mockImplementationOnce(() => {
      throw new Error('Erro inesperado!')
    })

    const request = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        confirm_password: 'any_password',
      },
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toEqual(500)
  })

  test('should return 200 if all correctly values', async () => {
    const { sut } = makeSut()

    const request = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        confirm_password: 'any_password',
      },
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toEqual(200)
  })
})
