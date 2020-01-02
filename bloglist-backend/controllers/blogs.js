const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate(['user', 'comments'])
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token
  if (!token) {
    return response.status(401).json({ error: 'token is missing' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token is invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const data = { ...body, likes: body.likes || 0 }
  const blog = new Blog({ ...data, user: user._id })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const blogToReturn = await Blog.findById(savedBlog._id).populate('user')
    response.status(201).json(blogToReturn)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const token = request.token
  if (!token) {
    return response.status(401).json({ error: 'token is missing' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token is invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (blog.user && blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'can delete only own blogs' })
  }
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.status(204).json(request.body)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.toJSON())
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.comments.map(comment => comment.toJSON()))
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const comment = new Comment({ content: request.body.content })
  const savedComment = await comment.save()
  blog.comments.push(savedComment)
  await blog.save()
  response.status(201).json(savedComment)
})

module.exports = blogsRouter
