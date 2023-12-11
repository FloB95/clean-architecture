import { Post as PrismaPost, PrismaClient } from '@prisma/client'
import Post from '../../../core/entities/Post'
import { IPostRepository } from '../../../core/interfaces/repositories/PostRepository'
import UserPrismaRepository from '../user/UserPrismaRepository'

class PostPrismaRepository implements IPostRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      include: { user: true },
    })
    return posts.map((post) => PostPrismaRepository.mapToPost(post))
  }

  async findById(id: string): Promise<Post | undefined> {
    const post = await this.prisma.post.findUnique({ where: { id } })
    return post ? PostPrismaRepository.mapToPost(post) : undefined
  }

  async update(item: Post): Promise<Post> {
    const post = await this.prisma.post.update({
      where: { id: item.id },
      data: { title: item.title, content: item.content },
    })

    return PostPrismaRepository.mapToPost(post)
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.post.delete({ where: { id } })
    return true
  }

  async create(post: Post): Promise<Post> {
    const prismaPost = await this.prisma.post.create({
      data: { title: post.title, content: post.content, userId: post.author.id },
    })

    return PostPrismaRepository.mapToPost(prismaPost)
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

export default PostPrismaRepository
