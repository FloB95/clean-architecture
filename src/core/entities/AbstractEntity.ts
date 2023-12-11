export abstract class AbstractEntity {
  private _id: string = ''
  private _createdAt: Date = new Date()
  private _updatedAt: Date | null = null

  // getters
  get id(): string {
    return this._id
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

  set createdAt(value: Date) {
    this._createdAt = value
  }

  set updatedAt(value: Date | null) {
    this._updatedAt = value
  }

  public toJSON(): object {
    const props = Object.getOwnPropertyNames(this)
    let jsonObj: any = {}
    for (let prop of props) {
      if (prop.startsWith('_')) {
        jsonObj[prop.substring(1)] = (this as any)[prop]
      } else {
        jsonObj[prop] = (this as any)[prop]
      }
    }
    return jsonObj
  }
}
