const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const config = require('../utils/config')
const logger = require('../utils/logger')

const mongoURI = config.MONGO_URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(_ => console.log('✅ Connected to MongoDB'))
  .catch(err => logger.error('❌ Connection Error!', err.message))

const blogSchema = new mongoose.Schema({
  user:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
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
  likes: Number,
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