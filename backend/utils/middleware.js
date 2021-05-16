const logger = require('./logger')
const jwt = require("jsonwebtoken");
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else {
        return response.status(400).json({error: error.message})
    }

    // next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        request[decodedToken.userIdKey] = Number(decodedToken.userId)
    }
    // todo determine who is who
    // request.studentId = request.query.studentId
    // request.instructorId = request.query.instructorId
    // request.adminId = request.query.adminId

    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
}
