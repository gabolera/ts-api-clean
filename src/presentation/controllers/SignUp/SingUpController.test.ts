import { describe, expect, test } from 'vitest'
import { SignUpController } from './SignUpController'

describe('SignUp Controller Test ', () => {
  test('should be 400 if email is not provided', () => {
    const request = {
      body: {
        name: 'any_name',
        password: 'any_password',
        confirm_password: 'any_confirm_password',
      },
    }
    const sut = new SignUpController().handle(request)
    expect(sut.statusCode).toEqual(400)
    expect(sut.data).toEqual(new Error('The email field is missing!'))
  })

  test('should be 400 if name is not provided', () => {
    const request = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        confirm_password: 'any_confirm_password',
      },
    }
    const sut = new SignUpController().handle(request)
    expect(sut.statusCode).toEqual(400)
    expect(sut.data).toEqual(new Error('The name field is missing!'))
  })

  test('should be 400 if password is not provided', () => {
    const request = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        confirm_password: 'any_confirm_password',
      },
    }
    const sut = new SignUpController().handle(request)
    expect(sut.statusCode).toEqual(400)
    expect(sut.data).toEqual(new Error('The password field is missing!'))
  })

  test('should be 400 if confirm_password is not provided', () => {
    const request = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
      },
    }
    const sut = new SignUpController().handle(request)
    expect(sut.statusCode).toEqual(400)
    expect(sut.data).toEqual(
      new Error('The confirm_password field is missing!')
    )
  })

  test('should be 200 with make a signup', () => {
    const request = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        confirm_password: 'any_password',
      },
    }
    const sut = new SignUpController().handle(request)
    expect(sut.statusCode).toEqual(200)
    // expect(sut.data).toEqual()
  })
})
