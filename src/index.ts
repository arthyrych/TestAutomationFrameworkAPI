// explicit named exports - star exports would silently drop names colliding across protocols

// GraphQL (GraphQLZero)
export { GraphqlBaseClient } from "./graphqlBaseClient"
export {
  createUserResponseSchema,
  deleteUserResponseSchema,
  getUserResponseSchema,
  graphqlErrorsSchema,
  graphqlUserSchema,
  nullUserResponseSchema,
  updateUserResponseSchema
} from "./graphqlSchemas"
export { UsersGraphqlClient } from "./usersGraphqlClient"
export type { GraphqlUser } from "./usersGraphqlClient"

// REST (GoRest)
export { BaseClient, getToken } from "./baseClient"
export { userSchema, usersListSchema, validationErrorsSchema } from "./schemas"
export { UsersClient } from "./usersClient"
export type { User } from "./usersClient"
