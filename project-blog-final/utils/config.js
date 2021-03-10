require('dotenv').config()

const {
  PORT,
  MONGO_URI,
  SECRET,
  BEARER_TOKEN
} = process.env

module.exports = {
  PORT,
  MONGO_URI,
  SECRET,
  BEARER_TOKEN
}