// REST (GoRest)
import { faker } from "@faker-js/faker"
import { generateUniqueEmail, getRandomItem } from "../helpers"
import { User } from "../src"

export function generateRandomUser(): User {
  return {
    email: generateUniqueEmail(),
    gender: getRandomItem(["male", "female"]),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    status: "active"
  }
}
