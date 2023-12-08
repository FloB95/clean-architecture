import Fastify from 'fastify'
import postHandlingController from './modules/post'
import { fastifyErrorHandler, fastifyRequestParser } from './lib/fastify'

const fastify = Fastify({
  logger: true,
})

fastify.setErrorHandler(fastifyErrorHandler)

// Declare a route
fastify.get('/', async function (request, reply) {
  const res = await postHandlingController.createPost(fastifyRequestParser(request))
  reply.statusCode = res.statusCode
  reply.headers(res.headers)
  reply.send(res.data)
})

// Declare a route
fastify.get('/t', async function (request, reply) {
  const res = await postHandlingController.getPosts(fastifyRequestParser(request))
  reply.statusCode = res.statusCode
  reply.headers(res.headers)
  reply.send(res.data)
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
