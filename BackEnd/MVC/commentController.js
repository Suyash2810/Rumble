const _ = require('lodash');

const {
  Comment
} = require('../models/comments');

var saveComment = (request, response) => {

  let commentbody = _.pick(request.body, ['username', 'imagePath', 'content', 'creator_id']);
  commentbody.imagePath = "Not implemented yet.";

  console.log(commentbody);

  let comment = new Comment(commentbody);

  comment.save().then(
    (result) => {
      console.log(result, "\n This is the data being stored in the database.");
      response.status(200).send({
        status: "Data has been stored successfully",
        comment: result
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

var getComments = (request, response) => {

  Comment.find({}).then(
    (result) => {
      if (result) {
        console.log(result);
        response.status(200).send({
          status: "The data has been retrieved successfully.",
          comments: result
        });
      } else {
        response.status(404).send({
          status: "The data could not be retrived from the database.",
          comments: null
        });
      }
    }
  ).catch(
    (error) => {
      response.status(400).send({
        error: error
      })
    }
  )
}

module.exports = {
  saveComment,
  getComments
}
