import { expect } from "chai"
import { EchoWsClient, wsGreetingSchema } from "../../src"

describe("ws healthcheck", () => {
  it("connects, receives the greeting frame and closes cleanly", async () => {
    const client = new EchoWsClient()
    const greeting = await client.connectAndGreet()
    wsGreetingSchema.parse(greeting)
    const closed = await client.close()
    expect(closed.code).to.equal(1000)
    expect(closed.wasClean).to.equal(true)
  })
})
