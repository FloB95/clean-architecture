import { CustomAPIError } from './CustomAPIError'

export class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message, 404)
  }
}
