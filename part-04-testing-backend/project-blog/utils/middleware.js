const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('------LOG------')
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('===============')
  next()
}

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: '404 - Nothing here but us chickens' })
}

const errorHandler = (err, req, res, next) => {
  logger.error('----❌ERROR❌----')
  logger.error(err.message)

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token, access denied' })
  }

  next(err)
}

const errorHandlerFinal = (err, req, res, next) => {
  res.status(400).send({ finalError: `${err.name} - ${err.message}` })
}

const getTokenFrom = (req, res, next) => {
  const auth = req.headers.authorization
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7)
  } else req.token = null;
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  errorHandlerFinal,
  getTokenFrom
}