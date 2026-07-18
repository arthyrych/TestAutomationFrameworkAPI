import { RestBaseClient } from "./baseClient"

export interface RestUser {
  email: string
  gender: string
  name: string
  status: string
}

export class UsersRestClient extends RestBaseClient {
  private readonly resource = "/users"

  create(user: Partial<RestUser>) {
    return this.post(this.resource, user)
  }

  getById(id: number) {
    return this.get(`${this.resource}/${id}`)
  }

  list() {
    return this.get(this.resource)
  }

  partialUpdate(id: number, patch: Partial<RestUser>) {
    return this.patch(`${this.resource}/${id}`, patch)
  }

  remove(id: number) {
    return this.del(`${this.resource}/${id}`)
  }

  update(id: number, user: RestUser) {
    return this.put(`${this.resource}/${id}`, user)
  }
}
