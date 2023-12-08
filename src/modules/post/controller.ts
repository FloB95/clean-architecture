import { BadRequestError } from '../../errors'
import { makeApiHttpResponse } from '../../helpers/http'
import { IHttpRequest, IHttpResponse } from '../core/interfaces/request'
import { IPostCreateDTO } from './interfaces'
import Post from './post'
import PostService from './service'

export class PostController {
  constructor(private postService: PostService) {}

  async createPost(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const postDTO: IPostCreateDTO = {
        title: httpRequest.query?.title,
        content: httpRequest.query?.content,
      }

      // create post with hooks
      const post = await this.postService.create(postDTO, {
        preSave: async (data: IPostCreateDTO) => {
          console.log('pre-save hook', data)
        },
        postSave: async (post: Post) => {
          console.log('post-save hook', post)
        },
      })

      return makeApiHttpResponse(201, post)
    } catch (error: any) {
      throw new BadRequestError(error.message)
    }
  }

  async getPosts(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const posts = await this.postService.findAll()
      return makeApiHttpResponse(200, posts)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
