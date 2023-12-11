import localEventQueue from '../../infrastructure/events/LocalEventQueue'
import PostService from '../../core/services/PostService'
import PostMemoryRepository from '../../infrastructure/repositories/post/PostMemoryRepository'
import { PostController } from '../../infrastructure/controllers/api/PostController'

const postHandlingRepository = new PostMemoryRepository()
const postHandlingService = new PostService(postHandlingRepository, localEventQueue)
const postHandlingController = new PostController(postHandlingService)

export default postHandlingController
