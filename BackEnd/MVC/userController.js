const jwt = require('jsonwebtoken');

var {
  SignInLog,
  signUpLog,
  deleteAccountLog
} = require('../log_files/logFunctions/log');

const {
  User
} = require('../models/user');

const {
  Post
} = require('../models/post');

const {
  Note
} = require('../models/notes');

const {
  SubReply
} = require('../models/subComments');

const {
  Favorite
} = require('../models/favorite');

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

updateUserInfo = (request, response) => {

  let body = _.pick(request.body, ['username', 'email']);
  let id = request.user._id;

  User.findOneAndUpdate({
    _id: id
  }, {
    $set: body
  }, {
    new: true
  }).then(
    (result) => {
      response.status(200).send({
        status: 'The user data has been updated.',
        user: result
      });
    }
  ).catch(
    (error) => {
      response.status(400).send({
        error: error
      });
    }
  );
}

var deleteUserAccount = (request, response) => {

  let id = request.user._id;

  Comment.deleteMany({
    creator_id: id
  }).then(
    (result) => {
      console.log(`The comments of the user: ${id} have been deleted if any.`, result);
    }
  ).catch(
    (error) => {
      console.log("An error was encountered while deleting user's comments during account deletion process.", error);
    }
  );

  Favorite.deleteMany({
    userId: id
  }).then(
    (result) => {
      console.log(`The favorited posts of the user: ${id} have been deleted if any.`, result);
    }
  ).catch(
    (error) => {
      console.log("An error was encountered while deleting user's favorited posts during account deletion process.", error);
    }
  );

  SubReply.deleteMany({
    creator_id: id
  }).then(
    (result) => {
      console.log(`The sub replies of the user: ${id} have been deleted if any.`, result);
    }
  ).catch(
    (error) => {
      console.log("An error was encountered while deleting user's sup replies during account deletion process.", error);
    }
  );

  Note.deleteMany({
    userId: id
  }).then(
    (result) => {
      console.log(`The note saved by the user: ${id} have been deleted if any.`, result);
    }
  ).catch(
    (error) => {
      console.log("An error was encountered while deleting user's notes during account deletion process.", error);
    }
  );

  Post.deleteMany({
    creator_id: id
  }).then(
    (result) => {
      console.log(`The posts by the user: ${id} have been deleted if any.`, result);
    }
  ).catch(
    (error) => {
      console.log("An error was encountered while deleting user's posts during account deletion process.", error);
    }
  );

  deleteAccountLog(id, request.user.username, request.user.email);

  User.findByIdAndDelete(id).then(
    (result) => {
      response.status(200).send({
        status: "The user has been deleted.",
        user: result
      });
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
  createUser,
  getUserInfo,
  updateUserImage,
  updateUserInfo,
  deleteUserAccount
}
