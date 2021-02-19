const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.status(200).json(users)
})

usersRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (body.username.length < 3 || body.password.length < 3) {
    return res.status(400).json({ error: "username & password must be at least 3 chars"})
  }
  if (body.username.match(/[^a-zA-Z0-9]/g)) {
    return res.status(400).json({ error: "username can only contain letters and numbers"})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch(err) {
    next(err)
  }
})

usersRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const user = await User.findByIdAndDelete(id)
  return res.status(200).json(user)
})

module.exports = usersRouter