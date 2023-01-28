export class HttpResponse {
  private static statusCode: number = 200
  private static data: any

  public static status(code: number) {
    HttpResponse.statusCode = code
    return HttpResponse
  }

  public static send(data?: any): Response {
    HttpResponse.data = data ?? ''

    return {
      statusCode: HttpResponse.statusCode,
      data: HttpResponse.data ?? '',
    }
  }

  public static badRequest(data: any): Response {
    return {
      statusCode: 400,
      data: data ?? '',
    }
  }

  public static serverError(data: any): Response {
    return {
      statusCode: 500,
      data: data ?? '',
    }
  }
}

export interface Request {
  headers?: any
  params?: any
  body?: any
}

export interface Response {
  statusCode: any
  data?: any
}
