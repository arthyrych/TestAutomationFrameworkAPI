// explicit named exports - star exports would silently drop names colliding across REST, GraphQL and WebSocket

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

// WebSocket (echo.websocket.org)
export { WsBaseClient } from "./ws/baseClient"
export type { WsCloseInfo } from "./ws/baseClient"
export { EchoWsClient } from "./ws/echoClient"
export type { WsMessage } from "./ws/echoClient"
export { wsGreetingSchema, wsMessageSchema } from "./ws/schemas"
