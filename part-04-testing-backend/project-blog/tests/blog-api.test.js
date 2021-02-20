const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test-helper')
const { BEARER_TOKEN } = require('../utils/config')

let api;
beforeAll(() => {
  api = supertest(app)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const user = await User.findById("603047fcfd6eb851d7628652")

  for (let blog of helper.blogsArr) {
    if (!blog.user || blog.user.length === 0) {
      blog.user = [].concat(user._id)
    }
    const newBlog = new Blog(blog)
    await newBlog.save()
  }
})

describe('GET request to /api/blogs', () => {
  test('returns correct # of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.blogsArr.length)
  })
  
  test('JSON response contains a property named <id>', async () => {
    const response = await api.get('/api/blogs')
    const body = response.body
    body.forEach(ele => {
      expect(ele.id).toBeDefined()
    })
  })
})

describe("POST request to /api/blogs", () => {
  test('successfully creates new blog post', async () => {
    const newBlogPost = {
      title: "I hate pizza",
      author: "Chef Boyardee",
      url: "www.ihatepizza.org",
      likes: 69
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', BEARER_TOKEN)
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.blogsArr.length + 1)
  })
  
  test('has <likes> default to 0 if not included in request body', async () => {
    const newBlogPost = {
      title: "No one likes me",
      author: "Bitter Dan",
      url: "www.solonely.cc"
    }
  
    const postResponse = await api
      .post('/api/blogs')
      .set('Authorization', BEARER_TOKEN)
      .send(newBlogPost)
  
    expect(postResponse.body.likes)
      .toBe(0)
  })
  
  test('returns status 400 - Bad Request if <title> or <url> property is missing', async () => {
    const newBlogPost = {
      author: "Happy Dango"
    }
  
    const postResponse = await api
      .post('/api/blogs')
      .set('Authorization', BEARER_TOKEN)
      .send(newBlogPost)
      .expect(400)
  })
})

describe('PUT request to /api/blogs/:id', () => {
  test('succeeds if $id & token is valid', async () => {
    const id = '5a422a851b54a676234d17f7'
    const updateBody = {
      title: "God, I love melons!",
      likes: 42069
    }
    await api
      .put(`/api/blogs/${id}`)
      .set('Authorization', BEARER_TOKEN)
      .send(updateBody)
      .expect(200)

    const getResponse = await api.get('/api/blogs')
    const updatedBlog = getResponse.body.find(ele => ele.id === '5a422a851b54a676234d17f7')
    expect(updatedBlog.likes).toBe(42069)
  })

  test('fails if $id is valid but token is invalid', async () => {
    const id = '5a422a851b54a676234d17f7'
    const updateBody = {
      title: "God, I love melons!",
      likes: 42069
    }
    await api
      .put(`/api/blogs/${id}`)
      .set('Authorization', 'bearer asdfsadfsadf')
      .send(updateBody)
      .expect(401)
  })
})

describe('DELETE request to /api/blogs/:id', () => {
  test('succeeds if $id is valid & token is valid', async () => {
    const id = '5a422a851b54a676234d17f7'
    const deleteResponse = await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', BEARER_TOKEN)
      .expect(204)

    const getResponse = await api.get('/api/blogs')
    expect(getResponse.body).toHaveLength(helper.blogsArr.length - 1)  
  })

  test('fails if $id is valid but token is invalid', async () => {
    const id = '5a422a851b54a676234d17f7'
    const deleteResponse = await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', 'bearer asdfasdf')
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close();
});