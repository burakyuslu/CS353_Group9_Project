const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const db = require('../services/db')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  //const user = await User.findOne({ username: body.username })
  const userType = body.userType

  let user = undefined

  if(userType === "student"){
    user = await db.query('SELECT U.username FROM UserAcc U, Student S WHERE S.student_id = U.user_id AND @username = U.username AND @password = U.password;')
  }
  else if(userType === "instructor"){
    user = await db.query('SELECT * FROM UserAcc U, Instructor I WHERE I.instructor_id = U.user_id AND @username = U.username AND @password = U.password;')
  }
  else{
    return response.status(401).json({
      error: 'invalid type of user',
    })
  }

  const passwordCorrect =
    user === undefined
      ? false
      : await bcrypt.compare(body.password, user.password)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    user_id: user.user_id,
  }

  // eslint-disable-next-line no-undef
  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({ token, username: user.username, user_id: user.user_id })

})
module.exports = loginRouter