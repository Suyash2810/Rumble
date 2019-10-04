const _ = require('lodash');

const {
  Comment
} = require('../models/comments');

var saveComment = (request, response) => {

  let commentbody = _.pick(request.body, ['username', 'imagePath', 'content', 'creator_id', 'postId']);

  let comment = new Comment(commentbody);

  comment.save().then(
    (result) => {
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

  let postId = request.params.postId;

  Comment.find({
    postId: postId
  }).then(
    (result) => {
      if (result) {
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

var getCommentById = (request, response) => {

  let id = request.params.id;

  Comment.findById(id).then(
      (result) => {
        response.status(200).send({
          status: "The comment has been fetched successfully.",
          comment: result
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

updateCommentById = (request, response) => {

  let id = request.params.id;
  let body = _.pick(request.body, ['content']);
  Comment.findOneAndUpdate({
    _id: id
  }, {
    $set: body
  }, {
    new: true
  }).then(
    (result) => {
      response.status(200).send({
        status: "The comment has been updated successfully.",
        comment: result
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

var commentDelete = (request, response) => {

  let commentId = request.params.id;
  let creatorId = request.params.creatorId;
  let userId = request.user._id;

  if (creatorId == userId) {
    Comment.findOneAndDelete({
      _id: commentId,
      creator_id: creatorId
    }).then(
      (result) => {
        response.status(200).send({
          status: "The comment has been deleted successfully.",
          comment: result
        });
      }
    ).catch(
      (error) => {
        response.status(400).send({
          error: error
        });
      }
    );
  } else {
    response.status(401).send({
      error: "You are not authorized to delete the comment."
    });
  }
}

module.exports = {
  saveComment,
  getComments,
  getCommentById,
  updateCommentById,
  commentDelete
}
