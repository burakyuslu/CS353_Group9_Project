const config = require('./utils/config')

const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

// const usersRouter = require('./controllers/users') todo check later: is this necessary?
// auth
const loginRouter = require('./controllers/v1/login')
const signupRouter = require('./controllers/v1/signup')

// course
const newCoursesRouter = require("./controllers/newCourses")
const newUsers = require("./controllers/newUsers")
const newPayments = require("./controllers/newPayments")
const newAuth = require("./controllers/newAuth")
// const coursesRouter = require('./controllers/courses')
// const quizRouter = require('./controllers/quiz')
// const projectRouter = require('./controllers/project')
// const peerGradingRouter = require('./controllers/peerGrading')
// const lectureRouter = require('./controllers/lecture')

// payments
const refundCourseRouter = require('./controllers/v1/refundCourse')
const requestRouter = require('./controllers/v1/request')
const discountRouter = require('./controllers/v1/discount')


logger.info('connecting to', config.DB_HOST)


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// auth
// app.use("/api/auth", ...)
// app.use('/api/login', loginRouter)
// app.use('/api/signup', signupRouter)

// courses
app.use("/api/courses", newCoursesRouter)
app.use("/api/auth", newAuth)
app.use("/api/payments", newPayments)
app.use("/api/users", newUsers)

// app.use('/api/courses', coursesRouter)
// app.use('/api/quizzes', quizRouter)
// app.use('/api/projects', projectRouter)
// app.use('/api/lecture', lectureRouter)
// app.use('/api/peerGrading', peerGradingRouter)

// api/courses/:courseId
// api/courses/:courseId/ratings
// api/courses/:courseId/qna
// api/courses/:courseId/lectures
// api/courses/:courseId/lectures/:lectureId
// api/courses/:courseId/lectures/:lectureId/:qnaId gerek olmayabilir

// payment
// app.use("/api/payments", ...)
// app.use('/api/refundCourse', refundCourseRouter)
// app.use('/api/request', requestRouter)
// app.use('/api/discount', discountRouter)

// api/payments

// api/payments/refund
// api/payments/refunds
// api/payments/discounts
// api/payments/discount/:courseId


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
