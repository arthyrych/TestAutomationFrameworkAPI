// GraphQL (GraphQLZero)
import { faker } from "@faker-js/faker"
import { generateUniqueEmail } from "../helpers"
import { GraphqlUser } from "../src"

export function generateRandomGraphqlUser(): GraphqlUser {
  return {
    email: generateUniqueEmail(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    username: faker.internet.username()
  }
}
