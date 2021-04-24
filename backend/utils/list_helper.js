/* eslint-disable indent */
const { result } = require('lodash')
var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs.length && blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? undefined
    : blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max))
}

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? undefined
    : _.maxBy(
        _.reduce(
          _.countBy(blogs, (blog) => blog.author),
          (result, value, key) => {
            result.push({ author: key, blogs: value })
            return result
          },
          []
        ),
        (author) => author.blogs
      )
}

const mostLikes = (blogs) => {
  return blogs.length === 0
    ? undefined
    : _.maxBy(
        _.reduce(
          _.groupBy(blogs, (blog) => blog.author),
          (result, value, key) => {
            result.push({
              author: key,
              likes: _.reduce(value, (sum, blog) => sum + blog.likes, value[0]),
            })
            return result
          },
          []
        ),
        (author) => author.likes
      )
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
