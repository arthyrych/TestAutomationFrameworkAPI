import {BaseClient} from "./baseClient"

export interface User {
  email: string
  gender: string
  name: string
  status: string
}

export class UsersClient extends BaseClient {
  private readonly resource = "/users"

  create(user: Partial<User>) {
    return this.post(this.resource, user)
  }

  getById(id: number) {
    return this.get(`${this.resource}/${id}`)
  }

  list() {
    return this.get(this.resource)
  }

  partialUpdate(id: number, patch: Partial<User>) {
    return this.patch(`${this.resource}/${id}`, patch)
  }

  remove(id: number) {
    return this.del(`${this.resource}/${id}`)
  }

  update(id: number, user: User) {
    return this.put(`${this.resource}/${id}`, user)
  }
}
