import { EventQueue } from '../interfaces/events/EventQueue'
import Post from '../entities/Post'
import { IPostRepository } from '../interfaces/repositories/PostRepository'
import { IPostCreateDTO } from '../interfaces/dtos/PostDto'

// application layer
class PostService {
  constructor(private postRepository: IPostRepository, private eventQueue: EventQueue) {}

  async create(postData: IPostCreateDTO): Promise<Post> {
    const { title, content } = postData

    // validate title and content
    if (!title) throw new Error('Title is required')
    if (!content) throw new Error('Content is required')

    // trigger pre-save event
    this.eventQueue.publish('postPreSave', postData)

    const post = Post.create(postData)
    const savedPost = await this.postRepository.create(post)

    // trigger post-save event
    this.eventQueue.publish('postCreated', savedPost)

    return savedPost
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.findAll(10)
  }
}

export default PostService
