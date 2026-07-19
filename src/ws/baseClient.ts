import env from "../../config"

export interface WsCloseInfo {
  code: number
  wasClean: boolean
}

interface FrameWaiter {
  reject: (error: Error) => void
  resolve: (frame: string) => void
  timer: NodeJS.Timeout
}

// wraps the native Node WebSocket client (stable since Node 22.4) in promises for linear test flow
export class WsBaseClient {
  protected socket: WebSocket
  private queue: string[] = []
  private waiter: FrameWaiter | null = null

  // no auth - echo.websocket.org is public; pass a custom url to target other endpoints (negative tests)
  constructor(private url: string = env.wsUrl) {}

  // explicit 1000 so the server mirrors it (a bare close() ends as 1005 "no status");
  // echo.websocket.org needs ~5s to finish the close handshake, hence the 10s default
  close(timeoutMs = 10000): Promise<WsCloseInfo> {
    return new Promise((resolve, reject) => {
      // fail fast instead of waiting out the timeout on a connection that is not open
      if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
        reject(new Error("no open connection to close"))
        return
      }
      const timer = setTimeout(() => reject(new Error(`close timed out after ${timeoutMs}ms`)), timeoutMs)
      this.socket.onclose = event => {
        clearTimeout(timer)
        resolve({ code: event.code, wasClean: event.wasClean })
      }
      this.socket.close(1000)
    })
  }

  connect(timeoutMs = 5000): Promise<void> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`connect timed out after ${timeoutMs}ms`)), timeoutMs)
      this.socket = new WebSocket(this.url)
      this.socket.onopen = () => {
        clearTimeout(timer)
        // an unexpected drop rejects a pending nextMessage() instead of leaving it to a misleading timeout;
        // an intentional close() replaces this handler with its own
        this.socket.onclose = () => this.failWaiter(new Error("connection closed while waiting for a frame"))
        resolve()
      }
      this.socket.onerror = () => {
        clearTimeout(timer)
        reject(new Error(`connection failed: ${this.url}`))
      }
      this.socket.onmessage = event => this.deliver(String(event.data))
    })
  }

  // resolves with the next incoming frame - queued frames first, otherwise waits up to timeoutMs
  nextMessage(timeoutMs = 5000): Promise<string> {
    if (this.queue.length > 0) return Promise.resolve(this.queue.shift())
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.waiter = null
        reject(new Error(`no frame received within ${timeoutMs}ms`))
      }, timeoutMs)
      this.waiter = { reject, resolve, timer }
    })
  }

  send(frame: string) {
    this.socket.send(frame)
  }

  private deliver(frame: string) {
    if (this.waiter) {
      clearTimeout(this.waiter.timer)
      const { resolve } = this.waiter
      this.waiter = null
      resolve(frame)
    } else {
      this.queue.push(frame)
    }
  }

  private failWaiter(error: Error) {
    if (!this.waiter) return
    clearTimeout(this.waiter.timer)
    const { reject } = this.waiter
    this.waiter = null
    reject(error)
  }
}
