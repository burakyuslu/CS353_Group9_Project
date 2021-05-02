const config = require('./utils/config')

const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')

// const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const quizRouter = require('./controllers/quiz')
const coursesRouter = require('./controllers/courses')
// const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const peerGradingRouter = require('./controllers/peerGrading')
const viewCertificateRouter = require('./controllers/viewCertificate')
const lectureRouter = require('./controllers/lecture')
const notesOnLecturesRouter = require('./controllers/notesOnLectures')
const commentAndRateCourseRouter = require('./controllers/commentAndRateCourse')


logger.info('connecting to', config.DB_HOST)


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/quizzes', quizRouter)
app.use('/api/courses', coursesRouter)

// can kirsallioba's shitty code
app.use('/api/peerGrading', peerGradingRouter)
app.use('/api/viewCertificate', viewCertificateRouter)
app.use('/api/lecture', lectureRouter)
app.use('/api/notesOnLectures', notesOnLecturesRouter)
app.use('/api/commentAndRateCourse', commentAndRateCourseRouter)

// app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
