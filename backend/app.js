const config = require('./utils/config')

const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')

// const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
// const createQuizRouter = require('./controllers/createQuiz')
// const solveAndViewQuizRouter = require('./controllers/solveAndViewQuiz')
const quizRouter = require('./controllers/quiz')
const projectRouter = require('./controllers/project')
const coursesRouter = require('./controllers/courses')
const loginRouter = require('./controllers/login')
const signupRouter = require('./controllers/signup')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const peerGradingRouter = require('./controllers/peerGrading')
const viewCertificateRouter = require('./controllers/certificates')
const lectureRouter = require('./controllers/lecture')
const commentAndRateCourseRouter = require('./controllers/commentAndRateCourse')


logger.info('connecting to', config.DB_HOST)


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/users', quizRouter)
// app.use('/api/quizzes', createQuizRouter)
// app.use('/api/quizzes', solveAndViewQuizRouter)
app.use('/api/quizzes', projectRouter)
app.use('/api/courses', coursesRouter)


app.use('/api/peerGrading', peerGradingRouter)
app.use('/api/viewCertificate', viewCertificateRouter)
app.use('/api/lecture', lectureRouter)
app.use('/api/commentAndRateCourse', commentAndRateCourseRouter)
app.use('/api/login', loginRouter)
app.use('/api/signup', signupRouter)

// app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
