import { faker } from "@faker-js/faker"
import { WsMessage } from "../../src"

export function generateRandomWsMessage(): WsMessage {
  return {
    id: faker.string.uuid(),
    sentAt: new Date().toISOString(),
    text: faker.lorem.sentence()
  }
}
