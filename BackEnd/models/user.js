const mongoose = require('mongoose');
const validator = require('validator');
var passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const _ = require('lodash');

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
  username: {
    type: String,
    required: true
  },
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
});

userSchema.methods.toJSON = function () {
  var user = this;

  let userObj = user.toObject();
  let userBody = _.pick(userObj, ['_id', 'username', 'email']);

  return userBody;
}

userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


userSchema.statics.findUserWithEmailAndPassword = function (email, password) {
  var User = this;

  return User.findOne({
    email: email
  }).then(
    (user) => {
      if (!user) {
        return Promise.reject("User was not found in the database.");
      } else {

        return new Promise(
          (resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
              if (result) {
                resolve(user);
              } else {
                reject(err);
              }
            })
          }
        )
      }
    }
  ).catch(
    (err) => {
      return Promise.reject(err);
    }
  )
}

const User = mongoose.model("User", userSchema);

module.exports = {
  User
}
