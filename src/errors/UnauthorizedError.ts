import { CustomAPIError } from './CustomAPIError'

export class UnauthorizedError extends CustomAPIError {
  constructor(message: string) {
    super(message, 403)
  }
}
