import {
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify'
import { fastifyRequestParser } from '../../../../lib/fastify'
import postHandlingController from '../../../../../main/factories/post/PostControllerFactory'

const myMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  // Perform middleware logic here
  console.log('Executing middleware')
  done()
}

const PostRouter: FastifyPluginCallback = (fastify, opts, done) => {
  // create new post
  fastify.post('/post', async function (request, reply) {
    const res = await postHandlingController.createPost(fastifyRequestParser(request))
    reply.statusCode = res.statusCode
    reply.headers(res.headers)
    reply.send(res.data)
  })

  // get a list of posts
  fastify.get('/post', {
    preHandler: myMiddleware,
    handler: async function (request, reply) {
      const res = await postHandlingController.getPosts(fastifyRequestParser(request))
      reply.statusCode = res.statusCode
      reply.headers(res.headers)
      reply.send(res.data)
    },
  })

  done()
}

export default PostRouter
