// explicit named exports - star exports would silently drop names colliding across REST, GraphQL and WebSocket

// GraphQL (GraphQLZero)
export { generateRandomGraphqlUser } from "./graphql/users"

// REST (GoRest)
export { generateRandomRestUser } from "./rest/users"

// WebSocket (echo.websocket.org)
export { generateRandomWsMessage } from "./ws/messages"
