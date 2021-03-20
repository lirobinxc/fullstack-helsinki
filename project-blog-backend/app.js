const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogsRouter')
const loginRouter = require('./controllers/loginRouter')
const usersRouter = require('./controllers/usersRouter')

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(cors())

app.get('/api', (req, res) => {
  return res.status(200).send('Welcome to the API!')
})

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.errorHandlerFinal)

module.exports = app