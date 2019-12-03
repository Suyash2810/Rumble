const {
  Contact
} = require('../../models/contact');

const {
  ObjectID
} = require('mongodb');

const {
  user1Token,
  user2Token,
  users
} = require('./user.mvc.seed');


let contacts = [{
    username: "Jacob",
    email: "jacob@gmail.com",
    phone: "7887400568",
    content: "This is some content for the contact message.",
    creator_id: users[0]._id,
    tag: "technical",
    subject: "this is the subject."
  },
  {
    username: "Brandon",
    email: "brandon@gmail.com",
    phone: "7898400568",
    content: "This is some content for the contact message.",
    creator_id: users[1]._id,
    tag: "technical",
    subject: "this is the subject."
  }
];

let populateContacts = (done) => {

  Contact.remove({}).then(
    () => {
      return Contact.insertMany(contacts).then(
        () => done()
      )
    }
  );
}


module.exports = {
  contacts,
  populateContacts,
  user1Token,
  user2Token
}
