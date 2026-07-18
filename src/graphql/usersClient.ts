import { GraphqlBaseClient } from "./baseClient"

export interface GraphqlUser {
  email: string
  name: string
  username: string
}

// single source for the selection set so all documents stay in sync with graphqlUserSchema
const userFields = "id name username email"

// operations own their query documents - the GraphQL equivalent of REST resource paths
export class UsersGraphqlClient extends GraphqlBaseClient {
  createUser(input: GraphqlUser) {
    const document = `mutation ($input: CreateUserInput!) {
      createUser(input: $input) { ${userFields} }
    }`
    return this.query(document, { input })
  }

  deleteUser(id: string | number) {
    const document = `mutation ($id: ID!) {
      deleteUser(id: $id)
    }`
    return this.query(document, { id })
  }

  getUser(id: string | number) {
    const document = `query ($id: ID!) {
      user(id: $id) { ${userFields} }
    }`
    return this.query(document, { id })
  }

  updateUser(id: string | number, input: Partial<GraphqlUser>) {
    const document = `mutation ($id: ID!, $input: UpdateUserInput!) {
      updateUser(id: $id, input: $input) { ${userFields} }
    }`
    return this.query(document, { id, input })
  }
}
