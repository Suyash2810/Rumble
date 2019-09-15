const jwt = require('jsonwebtoken');

const {
  User
} = require('../models/user');

const _ = require('lodash');

var userLogin = (request, response) => {

  let body = _.pick(request.body, ['email', 'password']);

  User.findUserWithEmailAndPassword(body.email, body.password).then(
    (user) => {

      let access = 'auth';
      let token = jwt.sign({
        _id: user._id.toHexString(),
        access
      }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      }).toString();

      let userId = user._id.toString();

      response.status(200).send({
        success: "The user has been logged in successfully",
        user: user,
        token: token,
        expiresIn: 3600,
        creator_id: userId
      });

    }
  ).catch(
    (error) => {
      response.status(404).send({
        status: "Email or password is invalid.",
        error: error
      })
    }
  )
}

var createUser = (request, response) => {

  let body = _.pick(request.body, ['username', 'email', 'password']);
  let user = new User(body);

  user.save().then(
    (result) => {
      if (result) {
        response.status(200).send({
          status: "The data was saved successfully",
          user: result
        })
      } else {
        response.status(400).send({
          status: "An error was encountered. Please try again.",
          user: null
        })
      }
    }
  ).catch(
    (error) => {
      response.status(400).send({
        error: error
      })
    }
  )
}

module.exports = {
  userLogin,
  createUser
}
