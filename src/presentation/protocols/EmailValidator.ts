export interface EmailValidator {
  verify(email: string): boolean
}
