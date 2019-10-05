const mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  postId: {
    required: true,
    type: String
  },
  userId: {
    required: true,
    type: String
  }
});

var Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = {
  Favorite
}
