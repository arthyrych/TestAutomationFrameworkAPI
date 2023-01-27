const env = process.env.APP_ENV || 'dev'
const config = require(`./${env}`)

export default config
