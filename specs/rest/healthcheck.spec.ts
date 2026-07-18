import { expect } from "chai"
import { restUsersListSchema, UsersRestClient } from "../../src"

// runs unauthenticated - GoRest allows public reads, so this works even without a token
describe("healthcheck", () => {
  it("responds 200 with a non-empty user list", async () => {
    const res = await new UsersRestClient(null).list()
    expect(res.status).to.equal(200)
    expect(res.body.length).to.be.greaterThan(0)
    restUsersListSchema.parse(res.body)
  })
})
