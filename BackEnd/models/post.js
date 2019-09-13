var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  content: {
    type: String,
    required: true
  },
  imagePath: {
    required: true,
    type: String
  },
  creator_id: {
    required: true,
    type: String
  }
})

var Post = mongoose.model('Post', postSchema);

module.exports = {
  Post
}
