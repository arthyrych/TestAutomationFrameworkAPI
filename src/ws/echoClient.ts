import { WsBaseClient } from "./baseClient"

// arbitrary payload shape used by the echo suites - the server returns frames verbatim
export interface WsMessage {
  id: string
  sentAt: string
  text: string
}

export class EchoWsClient extends WsBaseClient {
  // echo.websocket.org sends a "Request served by <id>" greeting frame right after connecting
  async connectAndGreet(): Promise<string> {
    await this.connect()
    return this.nextMessage()
  }

  // sends a payload as JSON and returns the parsed echoed frame
  async echoJson(payload: object): Promise<unknown> {
    this.send(JSON.stringify(payload))
    return JSON.parse(await this.nextMessage())
  }
}
