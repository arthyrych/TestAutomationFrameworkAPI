// GraphQL (GraphQLZero)
import { faker } from "@faker-js/faker"
import { GraphqlUser } from "../src"

// email is unique per call - same convention as the REST generator
export function generateRandomGraphqlUser(): GraphqlUser {
  return {
    email: `test-email-${Date.now()}@example.com`,
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    username: faker.internet.username()
  }
}
