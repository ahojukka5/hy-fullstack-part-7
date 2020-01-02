const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Comment'
    }
  ]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
