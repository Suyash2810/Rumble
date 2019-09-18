var mongoose = require('mongoose');
var moment = require('moment');

var postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  title: {
    required: true,
    type: String
  },
  description: {
    type: String,
    required: true
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
  },
  createdAt: {
    type: String,
    default: moment().format("MMM Do YY")
  }
})

var Post = mongoose.model('Post', postSchema);

module.exports = {
  Post
}
