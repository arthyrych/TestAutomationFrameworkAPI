import {agent as request, Test} from "supertest"
import env from "../config"

// fails fast with an actionable message instead of cryptic 401s from the API
export function getToken(): string {
  const token = process.env.APP_TOKEN
  if (!token) throw new Error("APP_TOKEN is not set - copy .env.dist to .env and add your gorest.co.in token")
  return token
}

export class BaseClient {
  protected agent = request(env.baseUrl)
  private authHeader: string

  // pass null to send unauthenticated requests (negative tests)
  constructor(token: string | null = getToken()) {
    this.authHeader = token ? `Bearer ${token}` : ""
  }

  protected del(path: string) {
    return this.withAuth(this.agent.delete(path))
  }

  protected get(path: string) {
    return this.withAuth(this.agent.get(path))
  }

  protected patch(path: string, body: object) {
    return this.withAuth(this.agent.patch(path)).send(body)
  }

  protected post(path: string, body: object) {
    return this.withAuth(this.agent.post(path)).send(body)
  }

  protected put(path: string, body: object) {
    return this.withAuth(this.agent.put(path)).send(body)
  }

  private withAuth(req: Test): Test {
    return this.authHeader ? req.set("Authorization", this.authHeader) : req
  }
}
