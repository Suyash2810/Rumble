const _ = require('lodash');
const {
  Contact
} = require('../models/contact');

var saveContact = (request, response) => {

  let body = _.pick(request.body, ['username', 'email', 'phone', 'content', 'creator_id']);

  if (body.creator_id == null) {
    body.creator_id = "Anonymous";
  }

  var contact = new Contact(body);

  contact.save().then(
    result => {
      response.status(200).send({
        status: "The message has been saved.",
        contact: result
      });
    }
  ).catch(
    (error) => {
      response.status(400).send({
        error: error
      })
    }
  );
}


module.exports = {
  saveContact
}
