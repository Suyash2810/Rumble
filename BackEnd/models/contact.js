const mongoose = require('mongoose');
const validator = require('validator');

var contactSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String,
    validate: {
      validator: (value) => {
        return validator.isEmail(value)
      },
      message: "Email is not valid. Please enter a valid email."
    }
  },
  phone: {
    required: true,
    type: String,
    validate: {
      validator: (value) => {
        return validator.isMobilePhone(value);
      },
      message: "The number is not a valid phone number."
    }
  },
  content: {
    required: true,
    type: String
  },
  creator_id: {
    type: String
  }
});


var Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  Contact
}
