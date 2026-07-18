import { expect } from "chai"
import { step } from "mocha-steps"
import { generateRandomGraphqlUser } from "../../data"
import {
  createUserResponseSchema,
  deleteUserResponseSchema,
  getUserResponseSchema,
  updateUserResponseSchema,
  UsersGraphqlClient
} from "../../src"

// GraphQLZero fakes persistence - steps assert mutation responses, not round-trip reads; no cleanup needed
describe("graphql users CRUD", () => {
  const user = generateRandomGraphqlUser()
  let users: UsersGraphqlClient
  let id: string

  before(() => {
    // constructed here for symmetry with the REST suites (no token involved)
    users = new UsersGraphqlClient()
  })

  step("creates a user", async () => {
    const res = await users.createUser(user)
    expect(res.status).to.equal(200)
    expect(res.body.data.createUser).to.deep.include(user)
    createUserResponseSchema.parse(res.body)
    id = res.body.data.createUser.id
  })

  step("reads a seed user", async () => {
    // the created user is not readable back (fake persistence), so a stable seed id is read instead
    const res = await users.getUser(1)
    expect(res.status).to.equal(200)
    expect(res.body.data.user.id).to.equal("1")
    getUserResponseSchema.parse(res.body)
  })

  step("updates a seed user", async () => {
    // updating a fake-created id returns null fields, so the update targets a seed id
    const res = await users.updateUser("1", { name: "Updated Name" })
    expect(res.status).to.equal(200)
    expect(res.body.data.updateUser.name).to.equal("Updated Name")
    updateUserResponseSchema.parse(res.body)
  })

  step("deletes the created user", async () => {
    const res = await users.deleteUser(id)
    expect(res.status).to.equal(200)
    expect(res.body.data.deleteUser).to.equal(true)
    deleteUserResponseSchema.parse(res.body)
  })
})
