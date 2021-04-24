const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

// test('blogs are returne')
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('all blogs includes the newly added blog', async () => {
  const newBlog = {
    title: 'Clean code',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((blog) => blog.title)

  expect(titles).toContain('Clean code')
})

test('all blogs have unique identifier id', async () => {
  const blogs = await helper.blogsInDb()
  blogs.forEach((blog) => expect(blog.id).toBeDefined())
})

test('likes of newly added blog is set to zero if it is not specified', async () => {
  const newBlog = {
    title: 'Clean code',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/',
  }

  const resultBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body.likes).toBe(0)
})
test('server responds with status code 400 when required properties are missing', async () => {
  const newBlogWithoutTitle = {
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/',
  }

  const newBlogWithoutUrl = {
    title: 'Clean code',
    author: 'Robert C. Martin',
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  const newBlogWithoutTitleAndUrl = { author: 'Robert C. Martin' }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitleAndUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('delete one blog with valid id', async () => {
  const blogs = await helper.blogsInDb()
  await api
    .post(`/api/blogs/${blogs[0].id}`)
    .expect(204)
})

test('delete one blog with invalid id', async () => {
  const invalidId = 'ad__-$adf'
  await api
    .post(`/api/blogs/${invalidId}`)
    .expect(204)
})
test('delete one blog with nonexisting id', async () => {
  const nonExistingId = helper.nonExistingId()
  await api
    .post(`/api/blogs/${nonExistingId}`)
    .expect(204)
})
afterAll(() => {
  mongoose.connection.close()
})
