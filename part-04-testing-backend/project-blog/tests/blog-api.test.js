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

  for(let blog of helper.blogsArr) {
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
      .send(newBlogPost)
      .expect(400)
  })
})

describe('PUT request to /api/blogs/:id', () => {
  test('succeeds if $id is valid', async () => {
    const id = '5a422a851b54a676234d17f7'
    const updateBody = {
      title: "God, I love melons!",
      likes: 42069
    }
    await api
      .put(`/api/blogs/${id}`)
      .send(updateBody)
      .expect(200)

    const getResponse = await api.get('/api/blogs')
    const updatedBlog = getResponse.body.find(ele => ele.id === '5a422a851b54a676234d17f7')
    expect(updatedBlog.likes).toBe(42069)
  })
})

describe('DELETE request to /api/blogs/:id', () => {
  test('succeeds if $id is valid', async () => {
    const id = '5a422a851b54a676234d17f7'
    const deleteResponse = await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const getResponse = await api.get('/api/blogs')
    expect(getResponse.body).toHaveLength(helper.blogsArr.length - 1)  
  })
})

afterAll(() => {
  mongoose.connection.close();
});