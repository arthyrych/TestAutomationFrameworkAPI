import { expect } from "chai"
import { step } from "mocha-steps"
import { generateRandomRestUser } from "../../data"
import { restUserSchema, UsersRestClient } from "../../src"

// step() aborts the remaining steps on failure - right tool for a dependent CRUD chain
describe("users CRUD", () => {
  const user = generateRandomRestUser()
  let users: UsersRestClient
  let id: number

  before(() => {
    // constructed here so a missing token fails only this suite, with a clear message
    users = new UsersRestClient()
  })

  step("creates a user", async () => {
    const res = await users.create(user)
    expect(res.status).to.equal(201)
    expect(res.body).to.deep.include(user)
    restUserSchema.parse(res.body)
    id = res.body.id
  })

  step("reads the created user", async () => {
    const res = await users.getById(id)
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.include({ id, ...user })
    restUserSchema.parse(res.body)
  })

  step("replaces the user with PUT", async () => {
    const updated = { ...user, name: "Updated Name", status: "inactive" }
    const res = await users.update(id, updated)
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.include(updated)
    restUserSchema.parse(res.body)
  })

  step("partially updates the user with PATCH", async () => {
    const res = await users.partialUpdate(id, { status: "active" })
    expect(res.status).to.equal(200)
    expect(res.body.status).to.equal("active")
    restUserSchema.parse(res.body)
  })

  step("deletes the user", async () => {
    const res = await users.remove(id)
    expect(res.status).to.equal(204)
  })

  step("responds 404 for the deleted user", async () => {
    const res = await users.getById(id)
    expect(res.status).to.equal(404)
  })

  after(async () => {
    // best-effort cleanup in case the chain broke before the delete step
    if (users && id) await users.remove(id).catch(() => {})
  })
})
