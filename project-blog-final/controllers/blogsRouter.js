const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (req, res, next) => {
  Blog
    .find({})
    .populate('user', ['name', 'username'])
    .then(blogs => {
      res.json(blogs)
    })
    .catch(err => next(err))
})

blogsRouter.get('/:id', (req, res, next) => {
  const id = req.params.id

  Blog
    .findById(id)
    .populate('user', ['name', 'username'])
    .then(blog => res.status(200).json(blog))
    .catch(err => next(err))
  })

blogsRouter.post('/', async (req, res, next) => {
  // Access the TOKEN
  const token = req.token
  if (!token) {
    return res.status(401).json({ error: "Access denied!"})
  }

  try {
    const decodedToken = jwt.verify(token, SECRET)
    const user = await User.findById(decodedToken.id)
  
    // Access BODY
    const body = req.body
    if (!body.likes) {
      body.likes = 0
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    const savedUser = await user.save()
    return res.status(201).json(savedBlog)
  } catch(err) {
    next(err)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const blogId = req.params.id
  const token = req.token
  if (!token) {
    return res.status(401).json({ error: "Access denied." });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET)
    const user = await User.findById(decodedToken.id)
    const userId = user._id.toString()
    const blog = await Blog.findById(blogId)
    if (!blog.user.includes(userId)) {
      return res.status(401).json({ error: "This is not your blog! Access denied." });
    }
    const body = req.body
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, body, {new: true})
    return res.status(200).json(updatedBlog)
  } catch(err) {
    next(err)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  const blogId = req.params.id
  const token = req.token
  if (!token) {
    return res.status(401).json({ error: "Access denied." });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET)
    const user = await User.findById(decodedToken.id)
    const userId = user._id.toString()
    const blog = await Blog.findById(blogId)
    if (!blog.user.includes(userId)) {
      return res.status(401).json({ error: "This is not your blog! Access denied." });
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId)
    return res.status(204).json(deletedBlog)
  } catch(err) {
    next(err)
  }
})

module.exports = blogsRouter