var {
  SubReply
} = require('../models/subComments');

const _ = require('lodash');

var saveReply = (request, response) => {

  let body = _.pick(request.body, ['content', 'postId', 'parent_Id']);
  let data = {
    username: request.user.username,
    imagePath: request.user.imagePath,
    content: body.content,
    creator_id: request.user._id,
    postId: body.postId,
    parent_Id: body.parent_Id
  }

  let reply = new SubReply(data);

  reply.save().then(
    (result) => {
      response.status(200).send({
        status: "The reply has been saved successfully.",
        reply: result
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
  saveReply
}
