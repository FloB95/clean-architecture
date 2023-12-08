import IRepository from '../core/interfaces/repository'
import Post from './post'

export interface IPostCreateDTO {
  title: string
  content: string
}

export interface IPostRepository extends IRepository<Post> {}

export interface IPostHooks {
  preSave?: (data: IPostCreateDTO) => Promise<void>
  postSave?: (post: Post) => Promise<void>
}
