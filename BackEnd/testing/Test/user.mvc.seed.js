const {
  ObjectID
} = require('mongodb');

const {
  User
} = require('../../models/user');

const user1ID = new ObjectID();
const user2ID = new ObjectID();

const jwt = require('jsonwebtoken');
const access = "auth";
const user1Token = jwt.sign({
  access,
  _id: user1ID.toHexString()
}, 'sfhgduksyfshgfkdsgfhgsafhgdfkdsdgfsjfdkgy', {
  expiresIn: '1h'
}).toString();

const user2Token = jwt.sign({
  access,
  _id: user2ID.toHexString()
}, 'sfhgduksyfshgfkdsgfhgsafhgdfkdsdgfsjfdkgy', {
  expiresIn: '1h'
}).toString();

const users = [{
    _id: user1ID.toHexString(),
    username: "Eliot",
    email: "eliot@gmail.com",
    password: "Eliot123..",
    imagePath: '/img/somePath'
  },
  {
    _id: user2ID.toHexString(),
    username: "Brandon",
    email: "brandon@gmail.com",
    password: "Brandon123..",
    imagePath: '/img/somePath'
  }
];

const populateUsers = (done) => {

  User.remove({}).then(
    () => {
      var user1 = new User(users[0]).save();
      var user2 = new User(users[1]).save();

      return Promise.all([user1, user2]).then(() => done());
    }
  );
}

module.exports = {
  users,
  populateUsers,
  user1Token,
  user2Token
}
