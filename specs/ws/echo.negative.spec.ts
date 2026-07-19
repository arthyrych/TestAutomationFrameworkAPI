import { expect } from "chai"
import { EchoWsClient, WsBaseClient } from "../../src"

describe("ws negative", () => {
  it("rejects when connecting to an unreachable endpoint", async () => {
    let error
    try {
      await new WsBaseClient("wss://127.0.0.1:9").connect(3000)
    } catch (caught) {
      error = caught
    }
    expect(error, "expected connect to reject").to.be.an("error")
    expect(error.message).to.match(/connection failed|connect timed out/)
  })

  it("rejects when no frame arrives before the timeout", async () => {
    const client = new EchoWsClient()
    await client.connectAndGreet()
    let error
    try {
      await client.nextMessage(1000)
    } catch (caught) {
      error = caught
    } finally {
      // best-effort - the close contract is asserted in the healthcheck spec, not here
      await client.close().catch(() => {})
    }
    expect(error, "expected nextMessage to time out").to.be.an("error")
    expect(error.message).to.include("no frame received")
  })
})
