class Http {
  private statusCode: number = 200
  private data: any

  status(code: number) {
    this.statusCode = code
    return this
  }

  send(data: any = ''): Response {
    this.data = data

    return {
      statusCode: this.statusCode,
      data: this.data ?? '',
    }
  }
}

export default new Http()

export interface Request {
  headers?: any
  params?: any
  body?: any
}

export interface Response {
  statusCode: any
  data?: any
}
