import { BadRequestError } from '../errors'
import { IPostCreateDTO } from '../../../core/interfaces/dtos/PostDto'
import { IHttpRequest, IHttpResponse } from '../../../core/interfaces/http/Request'
import PostService from '../../../core/services/PostService'
import { makeApiHttpResponse } from '../../utils/http'

export class PostController {
  constructor(private postService: PostService) {}

  async createPost(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const postDTO: IPostCreateDTO = {
        title: httpRequest.query?.title,
        content: httpRequest.query?.content,
      }

      // create post with hooks
      const post = await this.postService.create(postDTO)

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
