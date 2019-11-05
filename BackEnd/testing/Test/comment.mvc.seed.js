const {
  Comment
} = require('../../models/comments');

const {
  ObjectID
} = require('mongodb');

let {
  posts
} = require('./post.mvc.seed.js');

let {
  users
} = require('./user.mvc.seed.js');

let comments = [{
    _id: new ObjectID().toHexString(),
    username: "Eliot",
    imagePath: 'http://localhost:3000/images/userImages/attractive-casual-close-up-1906997.jpg_1569671610409.jpeg',
    createdAt: 'Sep 28th 19',
    content: 'This is some random content.',
    creator_id: users[0]._id,
    postId: posts[0]._id
  },
  {
    _id: new ObjectID().toHexString(),
    username: "Brandon",
    imagePath: 'http://localhost:3000/images/userImages/attractive-casual-close-up-1906997.jpg_1569671610409.jpeg',
    createdAt: 'Sep 28th 19',
    content: 'This is some random content.',
    creator_id: users[1]._id,
    postId: posts[1]._id
  }
];

const populateComments = (done) => {

  Comment.remove({}).then(
    () => {
      return Comment.insertMany(comments).then(
        () => {
          done();
        }
      );
    }
  )
}

module.exports = {
  populateComments,
  comments
}
