const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')
const uniqueValidator = require('mongoose-unique-validator')

const mongoURI = config.MONGO_URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(data => console.log('✅ Connected to MongoDB'))
  .catch(err => logger.error('❌ Connection Error!', err.message))

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
    unique: true,
  },
  likes: Number
})
blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})


const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog

