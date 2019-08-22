var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  content: {
    type: String,
    required: true
  }
})

var Post = mongoose.model('Post', postSchema);

module.exports = {
  Post
}