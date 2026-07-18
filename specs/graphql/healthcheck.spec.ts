import { expect } from "chai"
import { getUserResponseSchema, UsersGraphqlClient } from "../../src"

// GraphQLZero is public - no token needed, so this works even without APP_TOKEN
describe("graphql healthcheck", () => {
  it("responds 200 with a known seed user", async () => {
    const res = await new UsersGraphqlClient().getUser(1)
    expect(res.status).to.equal(200)
    expect(res.body.data.user.id).to.equal("1")
    getUserResponseSchema.parse(res.body)
  })
})
