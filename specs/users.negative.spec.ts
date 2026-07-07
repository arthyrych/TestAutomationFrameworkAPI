import { expect } from "chai"
import { generateRandomUser } from "../data"
import { validationErrorsSchema, UsersClient } from "../src"

describe("users negative", () => {
  it("responds 401 when creating a user without a token", async () => {
    const res = await new UsersClient(null).create(generateRandomUser())
    expect(res.status).to.equal(401)
  })

  it("responds 404 for a non-existent user id", async () => {
    const res = await new UsersClient(null).getById(0)
    expect(res.status).to.equal(404)
  })

  it("responds 422 when the email is missing", async () => {
    const { gender, name, status } = generateRandomUser()
    const res = await new UsersClient().create({ gender, name, status })
    expect(res.status).to.equal(422)
    expect(res.body).to.deep.include({ field: "email", message: "can't be blank" })
    validationErrorsSchema.parse(res.body)
  })
})
