// explicit named exports - star exports would silently drop names colliding across protocols

// GraphQL (GraphQLZero)
export { GraphqlBaseClient } from "./graphql/baseClient"
export {
  createUserResponseSchema,
  deleteUserResponseSchema,
  getUserResponseSchema,
  graphqlErrorsSchema,
  graphqlUserSchema,
  nullUserResponseSchema,
  updateUserResponseSchema
} from "./graphql/schemas"
export { UsersGraphqlClient } from "./graphql/usersClient"
export type { GraphqlUser } from "./graphql/usersClient"

// REST (GoRest)
export { getRestToken, RestBaseClient } from "./rest/baseClient"
export { restUserSchema, restUsersListSchema, restValidationErrorsSchema } from "./rest/schemas"
export { UsersRestClient } from "./rest/usersClient"
export type { RestUser } from "./rest/usersClient"
