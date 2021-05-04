// const blogsRouter = require('express').Router()
// const Blog = require('../models/blog')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')
//
// blogsRouter.get('/', async (request, response) => {
//   const blogs = await Blog.find({}).populate('user')
//   response.json(blogs)
// })
//
// blogsRouter.post('/', async (request, response) => {
//   const body = request.body
//
//   const token = request.token
//   // eslint-disable-next-line no-undef
//   const decodedToken = jwt.verify(token, process.env.SECRET)
//   console.log(decodedToken)
//   if (!token || !decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }
//   const user = await User.findById(body.userId)
//
//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//     user: user._id,
//   })
//   // const blog = new Blog(request.body)
//   const savedBlog = await blog.save()
//   user.blogs = user.blogs.concat(savedBlog._id)
//   await user.save()
//   response.json(savedBlog)
// })
//
// blogsRouter.post('/:id', async (request, response) => {
//   const id = request.params.id
//   const token = request.token
//   // eslint-disable-next-line no-undef
//   const decodedToken = jwt.verify(token, process.env.SECRET)
//   if (!token || !decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }
//   // const user = await User.findById(body.userId)
//   const userid = decodedToken.id.toString()
//
//   const blog = await Blog.findById(id)
//   if (userid !== blog.user.toString()) {
//     return response.status(401).json({ error: 'unauthorized request' })
//   }
//
//   response.status(204).end()
// })
//
// blogsRouter.put('/:id', async (request, response) => {
//   const body = request.body
//   const updatedBlog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   }
//
//   await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
//     new: true,
//     runValidators: true,
//     context: 'query',
//   })
//
//   response.json(updatedBlog)
// })
//
// module.exports = blogsRouter
