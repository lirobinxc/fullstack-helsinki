const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogsRouter')
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/loginRouter')

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.getTokenFrom)
app.use(cors)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.errorHandlerFinal)

module.exports = app
