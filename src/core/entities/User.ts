import { AbstractEntity } from './AbstractEntity'

class User extends AbstractEntity {
  private _name: string = ''
  private _email: string = ''

  // Getter and setter for _name
  public get name(): string {
    return this._name
  }

  public set name(value: string) {
    this._name = value
  }

  // Getter and setter for _email
  public get email(): string {
    return this._email
  }

  public set email(value: string) {
    this._email = value
  }
}

export default User
