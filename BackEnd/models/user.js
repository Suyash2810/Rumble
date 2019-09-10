const mongoose = require('mongoose');
const validator = require('validator');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return validator.email(value);
      }
    }
  },
  password: {
    required: true,
    type: String,
    minlength: 6
  }
})

const User = mongoose.model("User", userSchema);

module.exports = {
  User
}
