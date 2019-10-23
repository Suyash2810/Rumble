const mongoose = require('mongoose');
const moment = require('moment');

var noteSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  userId: {
    required: true,
    type: String
  },
  color: {
    required: true,
    type: String
  },
  createdAt: {
    type: String,
    default: moment().format("MMM Do YY")
  }
});

var Note = mongoose.model("Note", noteSchema);

module.exports = {
  Note
}
