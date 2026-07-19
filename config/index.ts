// shared: REST + GraphQL + WebSocket
import dev from "./dev"

// static env map (ESM: no dynamic require); add new envs here
const configs = { dev }
const env = (process.env.APP_ENV ?? "dev") as keyof typeof configs

export default configs[env] ?? configs.dev
