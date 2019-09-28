const jwt = require('jsonwebtoken');

var {
  SignInLog,
  signUpLog
} = require('../log_files/logFunctions/log');

const {
  User
} = require('../models/user');

const {
  Comment
} = require('../models/comments');

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

      let userId = user._id;
      SignInLog(user);

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
      console.log(error);
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
        signUpLog(body.username, body.email);
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

var getUserInfo = (request, response) => {

  let Id = request.user._id;

  User.findById(Id).then(
    (user) => {
      response.status(200).send({
        status: "The user has been successfully",
        user: user
      })
    }
  ).catch(
    (error) => {
      response.status(400).send({
        error: error
      })
    }
  )
}

var updateUserImage = (request, response) => {

  let id = request.params.userId;
  let protocol = request.protocol;
  let host = request.get("host");
  let url = protocol + "://" + host;
  let updateBody = {
    imagePath: url + "/images/userImages/" + request.file.filename
  }

  Comment.updateMany({
    creator_id: id
  }, {
    $set: updateBody
  }).then(
    (result) => {
      console.log(result);
    }
  ).catch(
    (error) => {
      console.log(error);
    }
  );

  User.findOneAndUpdate({
      _id: id
    }, {
      $set: updateBody
    }, {
      new: true
    }).then(
      (result) => {
        response.status(200).send({
          status: "The image has been updated successfully.",
          user: result
        })
      }
    )
    .catch(
      (error) => {
        response.status(400).send({
          error: error
        })
      }
    )
}

module.exports = {
  userLogin,
  createUser,
  getUserInfo,
  updateUserImage
}
