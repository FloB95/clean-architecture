import IRepository from '../../core/interfaces/repository'
import Post from './post'

export interface IPostCreateDTO {
  title: string
  content: string
}

export interface IPostRepository extends IRepository<Post> {}
