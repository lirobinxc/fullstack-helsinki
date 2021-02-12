const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test-helper')

let api;
beforeAll(() => {
  api = supertest(app)
})

beforeEach(async () => {
  await Blog.deleteMany({})

  for(let i of helper.blogsArr) {
    const newBlog = new Blog(i)
    await newBlog.save()
  }
})

test('GET returns correct # of blogs', async () => {
  
})