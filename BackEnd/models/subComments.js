const mongoose = require('mongoose');
const moment = require('moment');

var subCommentSchema = new mongoose.Schema({
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
  },
  postId: {
    required: true,
    type: String
  },
  parent_Id: {
    required: true,
    type: String
  }
});

var SubReply = mongoose.model("SubReply", subCommentSchema);

module.exports = {
  SubReply
}
