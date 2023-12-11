import { FastifyReply, FastifyRequest } from 'fastify'
import { IHttpRequest } from '../../core/interfaces/http/Request'
import { CustomAPIError } from '../../core/errors/api'

export const fastifyRequestParser = (request: FastifyRequest): IHttpRequest => {
  const { body, params, query, headers } = request
  return Object.freeze({ body, params, query, headers })
}

export const fastifyErrorHandler = (error: Error, request: FastifyRequest, reply: FastifyReply) => {
  if (error instanceof CustomAPIError) {
    return reply.status(error.statusCode).send({ message: error.message, code: error.statusCode })
  }
  return reply.status(500).send({
    message: error.message,
    code: 500,
  })
}
