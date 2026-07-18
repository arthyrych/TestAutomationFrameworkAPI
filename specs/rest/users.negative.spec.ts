import { expect } from "chai"
import { generateRandomRestUser } from "../../data"
import { restValidationErrorsSchema, UsersRestClient } from "../../src"

describe("users negative", () => {
  it("responds 401 when creating a user without a token", async () => {
    const res = await new UsersRestClient(null).create(generateRandomRestUser())
    expect(res.status).to.equal(401)
  })

  it("responds 404 for a non-existent user id", async () => {
    const res = await new UsersRestClient(null).getById(0)
    expect(res.status).to.equal(404)
  })

  it("responds 422 when the email is missing", async () => {
    const { gender, name, status } = generateRandomRestUser()
    const res = await new UsersRestClient().create({ gender, name, status })
    expect(res.status).to.equal(422)
    expect(res.body).to.deep.include({ field: "email", message: "can't be blank" })
    restValidationErrorsSchema.parse(res.body)
  })
})
