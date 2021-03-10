const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogsRouter')

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.getTokenFrom)
app.use(cors())

app.get('/api', (req, res) => {
  return res.status(200).send('Welcome to the API!')
})

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.errorHandlerFinal)

module.exports = app