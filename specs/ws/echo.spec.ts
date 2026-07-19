import { expect } from "chai"
import { generateRandomWsMessage } from "../../data"
import { EchoWsClient, wsMessageSchema } from "../../src"

// fresh connection per test - a failed echo cannot desync the frame queue of the next test
describe("ws echo", () => {
  let client: EchoWsClient

  beforeEach(async () => {
    client = new EchoWsClient()
    await client.connectAndGreet()
  })

  // best-effort cleanup, mirrors the REST after hooks
  afterEach(async () => {
    try {
      await client.close()
    } catch {
      // connection already gone - nothing to clean up
    }
  })

  it("echoes a text frame unchanged", async () => {
    const frame = "ping"
    client.send(frame)
    expect(await client.nextMessage()).to.equal(frame)
  })

  it("echoes a JSON message with identical content", async () => {
    const message = generateRandomWsMessage()
    const echoed = await client.echoJson(message)
    expect(echoed).to.deep.equal(message)
    wsMessageSchema.parse(echoed)
  })

  it("preserves order across sequential frames", async () => {
    const frames = ["first", "second", "third"]
    for (const frame of frames) client.send(frame)
    for (const frame of frames) expect(await client.nextMessage()).to.equal(frame)
  })
})
