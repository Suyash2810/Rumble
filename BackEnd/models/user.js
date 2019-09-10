const mongoose = require('mongoose');
const validator = require('validator');
var passwordValidator = require('password-validator');

var schema = new passwordValidator();
schema
  .is().min(6)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123', 'Password']); // Blacklist these values

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: "Email is not valid"
    }
  },
  password: {
    required: true,
    type: String,
    validate: {
      validator: (value) => {
        return schema.validate(value)
      },
      message: "Password is not valid. The password of min length 6 must have an uppercase, lowercase letter and a digit with no spaces in between."
    }
  }
})

const User = mongoose.model("User", userSchema);

module.exports = {
  User
}
