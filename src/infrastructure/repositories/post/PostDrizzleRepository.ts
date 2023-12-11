import Post from '../../../core/entities/Post'
import { IPostRepository } from '../../../core/interfaces/repositories/PostRepository'
import UserPrismaRepository from '../user/UserPrismaRepository'
import { MySql2Database } from "drizzle-orm/mysql2";
import * as schema from './../../db/drizzle/schema';  

class PostDrizzleRepository implements IPostRepository {
  constructor(private db: MySql2Database<typeof schema>) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.db.query.posts.findMany({
      with: { author: true },
    })
    
    return posts.map((post) => PostDrizzleRepository.mapToPost(post))
  }

  async findById(id: string): Promise<Post | undefined> {
    throw new Error("Method not implemented.");
    
  }

  async update(item: Post): Promise<Post> {
   throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async create(post: Post): Promise<Post> {
   throw new Error('Method not implemented.')
  }

  public static mapToPost(prismaPost: any): Post {
    const p = new Post()
    p.id = prismaPost.id
    p.title = prismaPost.title
    p.content = prismaPost.content
    p.createdAt = prismaPost.createdAt
    p.updatedAt = prismaPost.updatedAt
    p.author = UserPrismaRepository.mapToUser(prismaPost.user!)

    return p
  }
}

export default PostDrizzleRepository
