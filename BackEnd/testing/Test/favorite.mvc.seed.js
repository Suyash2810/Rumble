let {
  Favorite
} = require('../../models/favorite');

let {
  users,
  user1Token,
  user2Token
} = require('./user.mvc.seed');

let {
  posts
} = require('./post.mvc.seed');

let {
  ObjectID
} = require('mongodb');

let favorites = [{
    _id: new ObjectID().toHexString(),
    username: "Michelle",
    title: 'Some Title',
    description: "Some description",
    postId: posts[0]._id,
    userId: users[0]._id
  },
  {
    _id: new ObjectID().toHexString(),
    username: "Hailey",
    title: "Some title",
    description: 'Some description',
    postId: posts[1]._id,
    userId: users[1]._id
  }
];

let populateFavorites = (done) => {

  Favorite.remove({}).then(
    () => {
      return Favorite.insertMany(favorites).then(
        () => done()
      )
    }
  );
}

module.exports = {
  favorites,
  populateFavorites,
  user1Token,
  user2Token
}
