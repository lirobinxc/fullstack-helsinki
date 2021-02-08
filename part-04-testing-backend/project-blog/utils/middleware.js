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
  }

  next(err)
}

const errorHandlerFinal = (err, req, res, next) => {
  res.status(400).send({ error: `${err.name} - ${err.message}` })
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  errorHandlerFinal,
}