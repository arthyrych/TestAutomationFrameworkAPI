// GraphQL (GraphQLZero)
import { agent as request } from "supertest"
import env from "../config"

// no auth handling - GraphQLZero is public, so GraphQL suites run without APP_TOKEN
export class GraphqlBaseClient {
  protected agent = request(env.graphqlUrl)

  // public (unlike the protected REST verbs) - negative specs post raw malformed documents
  query(document: string, variables?: object) {
    return this.agent.post("").send({ query: document, variables })
  }
}
