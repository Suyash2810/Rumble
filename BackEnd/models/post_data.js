const mongoose = require('mongoose');

let postDataSchema = new mongoose.Schema({

  views: {
    type: Number,
    default: 0
  },
  favorites: {
    type: Number,
    default: 0
  },
  parent_post_id: {
    required: true,
    type: String
  }
});

let PostData = mongoose.model('PostData', postDataSchema);

module.exports = {
  PostData
}
