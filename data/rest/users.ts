import { faker } from "@faker-js/faker"
import { generateUniqueEmail, getRandomItem } from "../../helpers"
import { RestUser } from "../../src"

export function generateRandomRestUser(): RestUser {
  return {
    email: generateUniqueEmail(),
    gender: getRandomItem(["male", "female"]),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    status: "active"
  }
}
