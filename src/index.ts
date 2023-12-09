import Fastify from 'fastify'
import { fastifyErrorHandler, fastifyRequestParser } from './core/lib/fastify'
import postHandlingController from './modules/post'

const fastify = Fastify({
  logger: true,
})

// localEventQueue.subscribe('postCreated', (data: Post) => {
//   console.log('postCreated', data)
// })

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
