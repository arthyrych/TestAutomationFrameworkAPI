// explicit named exports - star exports would silently drop names colliding across REST and GraphQL

// GraphQL (GraphQLZero)
export { generateRandomGraphqlUser } from "./graphql/users"

// REST (GoRest)
export { generateRandomRestUser } from "./rest/users"
