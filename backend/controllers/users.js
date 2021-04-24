const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})
usersRouter.post('/', async (request, response) => {
  const body = request.body
  const password = body.password

  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'password length must be at least 3' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
    blogs: [],
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = usersRouter
