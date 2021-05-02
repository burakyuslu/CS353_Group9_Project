const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const db = require('../services/db')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  //const user = await User.findOne({ username: body.username })
  const userType = body.userType
  const userName = body.username
  const userPassword = body.password
  let user = undefined

  if(userType === "student"){
    user = await db.query('SELECT U.username FROM UserAcc U, Student S WHERE S.student_id = U.user_id AND ? = U.username AND ? = U.password;', userName, userPassword)
  }
  else if(userType === "instructor"){
    user = await db.query('SELECT * FROM UserAcc U, Instructor I WHERE I.instructor_id = U.user_id AND ? = U.username AND ? = U.password;', userName, userPassword)
  }
  else if(userType === "admin"){
    user = await db.query('SELECT U.username FROM SiteAdmin WHERE ? = admin_username AND ? = admin_password;', userName, userPassword)
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