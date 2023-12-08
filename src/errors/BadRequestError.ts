import { CustomAPIError } from './CustomAPIError'

export class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message, 400)
  }
}
