import Fastify from 'fastify'
import { fastifyErrorHandler } from '../lib/fastify'
import PostRouter from './api/v1/routes/postRouter'

const fastify = Fastify({
  logger: true,
})

// localEventQueue.subscribe('postCreated', (data: Post) => {
//   console.log('postCreated', data)
// })

fastify.setErrorHandler(fastifyErrorHandler)

fastify.register(PostRouter, { prefix: '/api/v1' })

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    // process.exit(1)
  }
})
