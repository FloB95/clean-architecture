import { IPostCreateDTO } from '../interfaces/dtos/PostDto'
import { AbstractEntity } from './AbstractEntity'
import User from './User'

class Post extends AbstractEntity {
  private _title: string = ''
  private _content: string = ''
  private _author: User = new User()

  // getters
  get title(): string {
    return this._title
  }

  get content(): string {
    return this._content
  }

  get author(): User {
    return this._author
  }

  // setters
  set title(value: string) {
    this._title = value
  }

  set content(value: string) {
    this._content = value
  }

  set author(value: User) {
    this._author = value
  }

  static create({ title, content }: IPostCreateDTO): Post {
    const post = new Post()
    post.id = '12312312' // You should generate a unique ID here
    post.title = title
    post.content = content
    post.createdAt = new Date()
    post.updatedAt = null
    return post
  }
}

export default Post
