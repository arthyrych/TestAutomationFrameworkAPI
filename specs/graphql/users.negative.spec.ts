import { expect } from "chai"
import { graphqlErrorsSchema, nullUserResponseSchema, GraphqlBaseClient, UsersGraphqlClient } from "../../src"

describe("graphql users negative", () => {
  it("responds 400 with GRAPHQL_VALIDATION_FAILED for an unknown field", async () => {
    const res = await new GraphqlBaseClient().query("{ user(id: 1) { id bogusField } }")
    expect(res.status).to.equal(400)
    expect(res.body.errors[0].extensions.code).to.equal("GRAPHQL_VALIDATION_FAILED")
    graphqlErrorsSchema.parse(res.body)
  })

  it("responds 400 with GRAPHQL_PARSE_FAILED for a malformed query", async () => {
    const res = await new GraphqlBaseClient().query("{ user(id: 1) { id ")
    expect(res.status).to.equal(400)
    expect(res.body.errors[0].extensions.code).to.equal("GRAPHQL_PARSE_FAILED")
    graphqlErrorsSchema.parse(res.body)
  })

  it("responds 200 with an all-null user for a nonexistent id", async () => {
    // GraphQL signals "not found" in-band via null fields, not via an HTTP status
    const res = await new UsersGraphqlClient().getUser(99999)
    expect(res.status).to.equal(200)
    nullUserResponseSchema.parse(res.body)
  })
})
