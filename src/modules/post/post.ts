import IEntity from '../core/interfaces/entity'
import User from '../user/user'
import { IPostCreateDTO } from './interfaces'

class Post implements IEntity {
  private _id: string = ''
  private _title: string = ''
  private _content: string = ''
  private _author: User = new User()
  private _createdAt: Date = new Date()
  private _updatedAt: Date | null = null

  // getters
  get id(): string {
    return this._id
  }

  get title(): string {
    return this._title
  }

  get content(): string {
    return this._content
  }

  get author(): User {
    return this._author
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date | null {
    return this._updatedAt
  }

  // setters
  set id(value: string) {
    this._id = value
  }

  set title(value: string) {
    this._title = value
  }

  set content(value: string) {
    this._content = value
  }

  set author(value: User) {
    this._author = value
  }

  set createdAt(value: Date) {
    this._createdAt = value
  }

  set updatedAt(value: Date | null) {
    this._updatedAt = value
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
