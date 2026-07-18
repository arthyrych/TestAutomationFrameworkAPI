// GraphQL (GraphQLZero)
import { GraphqlBaseClient } from "./graphqlBaseClient"

export interface GraphqlUser {
  email: string
  name: string
  username: string
}

// operations own their query documents - the GraphQL equivalent of REST resource paths
export class UsersGraphqlClient extends GraphqlBaseClient {
  createUser(input: GraphqlUser) {
    const document = `mutation ($input: CreateUserInput!) {
      createUser(input: $input) { id name username email }
    }`
    return this.query(document, { input })
  }

  deleteUser(id: string) {
    const document = `mutation ($id: ID!) {
      deleteUser(id: $id)
    }`
    return this.query(document, { id })
  }

  getUser(id: string | number) {
    const document = `query ($id: ID!) {
      user(id: $id) { id name username email }
    }`
    return this.query(document, { id })
  }

  updateUser(id: string, input: Partial<GraphqlUser>) {
    const document = `mutation ($id: ID!, $input: UpdateUserInput!) {
      updateUser(id: $id, input: $input) { id name username email }
    }`
    return this.query(document, { id, input })
  }
}
