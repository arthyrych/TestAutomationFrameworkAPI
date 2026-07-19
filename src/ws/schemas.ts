import { z } from "zod"

// frame contracts - specs call .parse() after transport assertions to catch echo drift
export const wsGreetingSchema = z.string().startsWith("Request served by")

export const wsMessageSchema = z.object({
  id: z.uuid(),
  sentAt: z.iso.datetime(),
  text: z.string()
})
