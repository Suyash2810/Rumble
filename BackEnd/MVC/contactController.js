const _ = require('lodash');
const {
  Contact
} = require('../models/contact');

var saveContact = (request, response) => {

  let body = _.pick(request.body, ['username', 'email', 'phone', 'content', 'creator_id', 'tag', 'subject']);

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

var getContacts = (request, response) => {

  Contact.find({}).then(
    (result) => {
      response.status(200).send({
        status: "The messages have been successfully.",
        contacts: result
      })
    }
  ).catch(
    (error) => {
      response.status(400).send({
        error: error
      })
    }
  )
}

var deleteContact = (request, response) => {

  let id = request.params.id;

  Contact.findOneAndDelete({
      _id: id
    }).then(
      (result) => {
        response.status(200).send({
          status: "The contact message was successfully deleted.",
          contact: result
        });
      }
    )
    .catch(
      (error) => {
        response.status(400).send({
          error: error
        });
      }
    );
}

var getContactById = (request, response) => {

  let id = request.params.id;

  Contact.findById(id).then(
    (result) => {
      response.status(200).send({
        status: "The contact has been fetched sucessfully.",
        contact: result
      });
    }
  ).catch(
    (error) => {
      response.status(400).send({
        error: error
      });
    }
  );
}

module.exports = {
  saveContact,
  getContacts,
  deleteContact,
  getContactById
}
