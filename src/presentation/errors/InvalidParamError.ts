export class InvalidParamError extends Error {
  constructor(field: string) {
    super(`Field ${field} is invalid!`)
    this.name = 'InvalidParamError'
  }
}
