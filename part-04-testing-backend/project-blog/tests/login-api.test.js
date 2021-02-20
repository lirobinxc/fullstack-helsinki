const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test-helper')

let api;
beforeAll(() => {
  api = supertest(app)
})

describe('Attempting to login', () => {
  test('fails if password is incorrect', async () => {
    const loginBody = {
      username: "lilyz92",
      password: "asdfasfde123"
    }

    await api
      .post('/api/login')
      .send(loginBody)
      .expect(401)
  })

  test('succeeds if password is correct', async () => {
    const loginBody = {
      username: "lilyz92",
      password: "chocolate123"
    }

    await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})