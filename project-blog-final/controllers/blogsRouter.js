const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const Blog = require('../models/blog')
// const User = require('../models/user')

blogsRouter.get('/', (req, res, next) => {
  Blog
    .find({})
    // .populate('user', ['name', 'username'])
    .then(blogs => {
      res.json(blogs)
    })
    .catch(err => next(err))
})

module.exports = blogsRouter