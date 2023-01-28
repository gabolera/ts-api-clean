export class MissingParamError extends Error {
  constructor(field: string) {
    super(`The ${field} field is missing!`)
    this.name = 'MissingParamError'
  }
}
