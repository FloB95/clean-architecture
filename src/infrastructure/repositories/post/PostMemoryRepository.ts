import Post from '../../../core/entities/Post'
import { IPostRepository } from '../../../core/interfaces/repositories/PostRepository'

const posts: Post[] = []

class PostMemoryRepository implements IPostRepository {
  constructor() {}

  findAll(): Promise<Post[]> {
    return new Promise((resolve, _) => {
      resolve(posts)
    })
  }
  findById(id: string): Promise<Post | undefined> {
    return new Promise((resolve, _) => {
      const post = posts.find((post) => post.id === id)
      resolve(post)
    })
  }
  update(item: Post): Promise<Post> {
    return new Promise((resolve, _) => {
      const post = posts.find((post) => post.id === item.id)
      if (!post) {
        throw new Error('Post not found')
      }

      post.title = item.title
      post.content = item.content

      resolve(post)
    })
  }
  delete(id: string): Promise<boolean> {
    return new Promise((resolve, _) => {
      posts.filter((post) => post.id !== id)
      resolve(true)
    })
  }
  create(post: Post): Promise<Post> {
    return new Promise((resolve, _) => {
      posts.push(post)
      resolve(post)
    })
  }
}

export default PostMemoryRepository
