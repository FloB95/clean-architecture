import { IHttpResponse } from '../../core/interfaces/http/Request'

export const makeApiHttpResponse = (
  statusCode: number,
  data: any,
  additionalHeaders: {} = {}
): IHttpResponse => {
  return {
    statusCode,
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    },
  }
}