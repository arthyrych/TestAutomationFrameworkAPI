import { z } from "zod"

// response contracts - specs call .parse() after status assertions to catch API drift
export const restUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  gender: z.enum(["male", "female"]),
  status: z.enum(["active", "inactive"])
})

export const restUsersListSchema = z.array(restUserSchema)

// GoRest 422 body: array of field errors
export const restValidationErrorsSchema = z.array(z.object({ field: z.string(), message: z.string() }))
