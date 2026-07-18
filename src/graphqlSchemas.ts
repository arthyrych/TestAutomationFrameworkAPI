// GraphQL (GraphQLZero)
import { z } from "zod"

// response contracts - specs call .parse() after status assertions to catch API drift
export const graphqlUserSchema = z.object({
  id: z.string(), // GraphQLZero returns ids as strings
  name: z.string(),
  username: z.string(),
  email: z.email()
})

// wraps a payload schema into the { data: { <field>: ... } } GraphQL response envelope
const dataOf = (field: string, schema: z.ZodType) => z.object({ data: z.object({ [field]: schema }) })

export const createUserResponseSchema = dataOf("createUser", graphqlUserSchema)
export const deleteUserResponseSchema = dataOf("deleteUser", z.boolean())
export const getUserResponseSchema = dataOf("user", graphqlUserSchema)
export const updateUserResponseSchema = dataOf("updateUser", graphqlUserSchema)

// nonexistent id: HTTP 200 with an all-null user object; derived from the user shape to stay in sync
const nullUserFields = Object.fromEntries(Object.keys(graphqlUserSchema.shape).map(field => [field, z.null()]))
export const nullUserResponseSchema = dataOf("user", z.object(nullUserFields))

// parse/validation failures: HTTP 400 with an errors array and no data
export const graphqlErrorsSchema = z.object({
  errors: z.array(z.object({ message: z.string(), extensions: z.object({ code: z.string() }) })).min(1)
})
