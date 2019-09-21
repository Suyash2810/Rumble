var mongoose = require('mongoose');
var moment = require('moment');

var commentSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  imagePath: {
    required: true,
    type: String
  },
  createdAt: {
    type: String,
    default: moment().format("MMM Do YY")
  },
  content: {
    required: true,
    type: String
  },
  creator_id: {
    type: String,
    required: true
  }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = {
  Comment
}
