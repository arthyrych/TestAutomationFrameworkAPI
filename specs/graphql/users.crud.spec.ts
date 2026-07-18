import { expect } from "chai"
import { step } from "mocha-steps"
import { generateRandomGraphqlUser } from "../../data"
import {
  createUserResponseSchema,
  deleteUserResponseSchema,
  updateUserResponseSchema,
  UsersGraphqlClient
} from "../../src"

// GraphQLZero fakes persistence - specs assert mutation responses, not round-trip reads; no cleanup needed
// (seed-read coverage lives in healthcheck.spec.ts; a read-after-create would find nothing to read)
describe("graphql users CRUD", () => {
  const user = generateRandomGraphqlUser()
  const users = new UsersGraphqlClient() // constructor cannot throw (no token), so no before() hook needed
  let id: string

  // independent of the chain below, placed first so a create failure cannot skip it (step() aborts the rest)
  it("updates a seed user", async () => {
    // updating a fake-created id returns null fields, so the update targets a seed id
    const res = await users.updateUser(1, { name: "Updated Name" })
    expect(res.status).to.equal(200)
    expect(res.body.data.updateUser.name).to.equal("Updated Name")
    updateUserResponseSchema.parse(res.body)
  })

  step("creates a user", async () => {
    const res = await users.createUser(user)
    expect(res.status).to.equal(200)
    expect(res.body.data.createUser).to.deep.include(user)
    createUserResponseSchema.parse(res.body)
    id = res.body.data.createUser.id
  })

  step("deletes the created user", async () => {
    const res = await users.deleteUser(id)
    expect(res.status).to.equal(200)
    expect(res.body.data.deleteUser).to.equal(true)
    deleteUserResponseSchema.parse(res.body)
  })
})
