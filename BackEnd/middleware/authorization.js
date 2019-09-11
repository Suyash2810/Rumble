const jwt = require('jsonwebtoken');

const authorization = (request, response, next) => {

  try {

    const token = request.headers.authAccess;
    const userToken = jwt.verify(token, process.env.JWT_SECRET);
    if (userToken) {
      console.log("User has been authenticated successfully");
    }
    next();
  } catch (err) {
    response.status(401).send({
      error: err
    })
  }
}

module.exports = {
  authorization
}
