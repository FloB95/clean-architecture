import { CustomAPIError } from './CustomAPIError'

export class UnauthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message, 401)
  }
}
