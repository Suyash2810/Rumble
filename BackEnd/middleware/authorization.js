const jwt = require('jsonwebtoken');
const {
  User
} = require('../models/user');

const authorization = (request, response, next) => {

  // try {

  //   const token = request.headers.authaccess;
  //   console.log(token);
  //   const userToken = jwt.verify(token, process.env.JWT_SECRET);
  //   if (userToken) {
  //     console.log("User has been authenticated successfully", userToken);
  //   }
  //   next();
  // } catch (err) {
  //   console.log(err);
  //   response.status(401).send({
  //     error: err
  //   })
  // }

  const token = request.headers.authaccess;
  if (!token) {
    response.status(401).send({
      error: "User isn\'t authenticated."
    });
  } else {
    let userToken = jwt.verify(token, process.env.JWT_SECRET);

    let id = userToken._id;

    User.findById(id).then(
      (user) => {
        if (!user) {
          response.status(401).send({
            error: "Invalid user. Token not valid."
          });
        } else {
          request.user = user;
          next();
        }
      }
    ).catch(
      (error) => {
        response.status(401).send({
          error: error
        });
      }
    )
  }
}

module.exports = {
  authorization
}
