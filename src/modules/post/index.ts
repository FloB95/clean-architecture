import { PostController } from './controller'
import PostRepository from './repository'
import PostService from './service'

const postHandlingRepository = new PostRepository()
const postHandlingService = new PostService(postHandlingRepository)
const postHandlingController = new PostController(postHandlingService)

export default postHandlingController
