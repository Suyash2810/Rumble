const {
  Post
} = require('../../models/post');

const {
  ObjectID
} = require('mongodb');

const {
  users
} = require('./user.mvc.seed');

const posts = [{
    _id: new ObjectID().toHexString(),
    username: users[0].username,
    title: "This is the title",
    description: 'This is the description.',
    content: "This is the content",
    imagePath: users[0].imagePath,
    creator_id: users[0]._id,
    commentStatus: true
  },
  {
    _id: new ObjectID().toHexString(),
    username: users[1].username,
    title: "This is the title",
    description: 'This is the description.',
    content: "This is the content",
    imagePath: users[1].imagePath,
    creator_id: users[1]._id,
    commentStatus: true
  }

];

const populatePosts = (done) => {
  Post.remove({}).then(() => {
    return Post.insertMany(posts)
  }).then(() => done());
}

module.exports = {
  populatePosts,
  posts
}
