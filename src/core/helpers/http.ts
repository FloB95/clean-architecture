import { IHttpResponse } from '../interfaces/request'

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