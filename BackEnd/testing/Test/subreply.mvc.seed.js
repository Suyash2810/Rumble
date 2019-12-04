let {
  SubReply
} = require('../../models/subComments');

let {
  users,
  user1Token,
  user2Token
} = require('./user.mvc.seed');

let {
  posts
} = require('./post.mvc.seed');

let {
  comments
} = require('./comment.mvc.seed');

const {
  ObjectID
} = require('mongodb');

let subreplies = [{
    _id: new ObjectID().toHexString(),
    username: "Bryan",
    imagePath: '/images/userimages',
    creator_id: users[0]._id,
    content: "this is some random content",
    postId: posts[0]._id,
    parent_Id: comments[0]._id
  },
  {
    _id: new ObjectID().toHexString(),
    username: "Lucas",
    imagePath: '/images/userimages',
    creator_id: users[1]._id,
    content: "this is some random content",
    postId: posts[1]._id,
    parent_Id: comments[1]._id
  }
];

let populateSubReplies = (done) => {

  SubReply.deleteMany({}).then(
    () => {
      return SubReply.insertMany(subreplies).then(() => done());
    }
  );
}

module.exports = {
  populateSubReplies,
  subreplies,
  user1Token,
  user2Token
}
