var _ = require('lodash');
var {
  Note
} = require('../models/notes');

var saveNote = (request, response) => {

  let body = _.pick(request.body, ['title', 'description', 'color', 'userId']);

  let note = new Note(body);

  note.save().then(
    (result) => {
      response.status(200).send({
        status: "The data has been saved successfully.",
        note: result
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

var getNotes = (request, response) => {

  let userId = request.user._id;

  Note.find({
    userId: userId
  }).then(
    (result) => {
      response.status(200).send({
        status: "The data has been fetched.",
        notes: result
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
  saveNote,
  getNotes
}
