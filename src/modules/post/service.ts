import { IPostCreateDTO, IPostRepository, IPostHooks } from './interfaces'
import Post from './post'

class PostService {
  constructor(private postRepository: IPostRepository) {}

  async create(postData: IPostCreateDTO, hooks: IPostHooks = {}): Promise<Post> {
    const { title, content } = postData

    // validate title and content
    if (!title) throw new Error('Title is required')
    if (!content) throw new Error('Content is required')

    // pre-save hooks
    if (hooks.preSave) {
      // TODO transform into array to support multiple hooks
      await hooks.preSave(postData)
    }

    const post = Post.create(postData)
    const savedPost = await this.postRepository.create(post)

    // post-save hooks
    if (hooks.postSave) {
      // TODO transform into array to support multiple hooks
      await hooks.postSave(savedPost)
    }

    return savedPost
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.findAll(10)
  }
}

export default PostService
