require('dotenv').config()
const http = require('http')
const app = require('./app')
const config = require('./utils/config')

const server = http.createServer(app)

const PORT = process.env.PORT
server.listen(PORT, () => {
  console.log('➤  Server running on', PORT)
  console.log('Connecting to MongoDB, please wait...')
})