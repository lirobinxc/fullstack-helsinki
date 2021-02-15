const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Routes for: ~/api/blogs

blogsRouter.get('/', (req, res, next) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
    .catch(err => next(err))
})

blogsRouter.get('/:id', (req, res, next) => {
  const id = req.params.id
  Blog
    .findById(id)
    .then(blog => res.status(200).json(blog))
    .catch(err => next(err))
})

blogsRouter.post('/', (req, res, next) => {
  // defaults likes to 0 if not included
  if (!req.body.likes) {
    req.body.likes = 0
  }

  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => next(err))
})

blogsRouter.put('/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  Blog.findByIdAndUpdate(id, body, {new: true})
    .then(blog => res.status(200).json(blog))
    .catch(err => next(err))
})

blogsRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id
  
  Blog
    .findByIdAndRemove(id)
    .then(blog => {
      res.status(204).json(blog)
    })
    .catch(err => next(err))
})

module.exports = blogsRouter