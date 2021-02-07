const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogsRouter')

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)
// app.use(middleware.errorHandlerFinal)

// error handling
const errorHandler = (err, req, res, next) => {
  console.log(`📣 ERROR ~`, err.message)
  
  if (err.name === 'CastError') {
    return res.status(400).send({error: 'ID does not exist'})
  }
  next(err) // calls next(err) if uncaught by above if statement
}
app.use(errorHandler)

// catches all uncaught errors
function errorHandlerFinal (err, req, res, next) {
  res.status(500)
  res.json({ error: 'bad request'})
}
app.use(errorHandlerFinal)


module.exports = app
