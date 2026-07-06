import {faker} from "@faker-js/faker"
import {getRandomItem} from "../helpers"
import {User} from "../src"

// email is unique per call - GoRest responds 422 to duplicate emails
export function generateRandomUser(): User {
  return {
    email: `test-email-${Date.now()}@example.com`,
    gender: getRandomItem(["male", "female"]),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    status: "active"
  }
}
