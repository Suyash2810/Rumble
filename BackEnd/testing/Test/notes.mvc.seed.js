let {
  Note
} = require('./../../models/notes');

let {
  ObjectID
} = require('mongodb');

let {
  users,
  user1Token,
  user2Token
} = require('./user.mvc.seed');

let notes = [{
    _id: new ObjectID().toHexString(),
    title: "Some title",
    description: "Some description",
    color: 'some color',
    userId: users[0]._id
  },
  {
    _id: new ObjectID().toHexString(),
    title: "Some title",
    description: "Some description",
    color: 'some color',
    userId: users[1]._id
  }
];

let populateNotes = (done) => {

  Note.remove({}).then(
    () => {
      return Note.insertMany(notes).then(
        () => {
          done();
        }
      );
    }
  );
}

module.exports = {
  populateNotes,
  user1Token,
  user2Token,
  notes
}
