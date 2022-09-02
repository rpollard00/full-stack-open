require("dotenv").config()

const MONGODB_URI = process.env.NODE_ENV === "test"
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
const PORT = process.env.PORT
const JWT_SECRET = 'THIS_is_THE_secret_JWT'

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET
}
