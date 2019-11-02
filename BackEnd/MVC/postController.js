const {
  Post
} = require('../models/post');

const _ = require('lodash');

var updatePost = (request, response) => {

  let id = request.params.id;
  let userId = request.user._id;

  let body = _.pick(request.body, ['title', 'content', 'description']);
  const url = request.protocol + "://" + request.get("host");

  let postBody;

  if (request.file) {
    postBody = {
      ...body,
      imagePath: url + "/images/" + request.file.filename
    }
  } else {
    postBody = {
      ...body
    }
  }

  Post.findOneAndUpdate({
    _id: id,
    creator_id: userId
  }, {
    $set: postBody
  }, {
    new: true
  }).then(
    (result) => {
      if (result) {
        response.status(200).send({
          success: "Post has been updated.",
          post: result
        })
      } else {
        response.status(401).send({
          error: "The user cannot edit this post."
        });
      }
    }
  ).catch(
    (error) => {
      response.status(400).send({
        error: error
      });
    }
  );

}

var deletePost = (request, response) => {

  let id = request.params.id;
  let userId = request.user._id;

  Post.findOneAndDelete({
      _id: id,
      creator_id: userId
    })
    .then(
      (result) => {
        if (result) {
          response.status(200).send(result);
        } else {
          response.status(401).send({
            err: "Post could not be deleted."
          });
        }
      });
}

var getPostById = (request, response) => {

  let id = request.params.id;

  Post.findById(id).then(
    (post) => {
      response.status(200).send({
        success: "The post has been fetched from the database.",
        post: post
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

var savePost = (request, response) => {

  let body = _.pick(request.body, ['title', 'content', 'description', 'username']);
  const url = request.protocol + "://" + request.get("host");

  let id = request.user._id.toString();

  let postBody = {
    username: request.user.username || body.username,
    title: body.title !== 'null' ? body.title : undefined,
    content: body.content !== 'null' ? body.content : undefined,
    description: body.description !== 'null' ? body.description : undefined,
    imagePath: url + "/images/" + request.file.filename,
    creator_id: id,
    commentStatus: true
  }

  let post = new Post(postBody);

  post.save().then(
    (result) => {
      response.status(201).send({
        message: "The data was stored successfully",
        post: {
          id: result._id,
          username: result.username,
          title: result.title,
          description: result.description,
          content: result.content,
          imagePath: result.imagePath,
          creator_id: id,
          createdAt: result.createdAt
        }
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

var getPosts = async (request, response) => {

  const pageSize = +request.query.pagesize;
  const currentPage = +request.query.page;
  const query = Post.find({});
  var fetchedPosts;

  if (pageSize && currentPage) {
    query
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  query
    .then(
      (posts) => {
        fetchedPosts = posts;
        return Post.count();
      }
    )
    .then(
      (count) => {

        response.json({
          status: "The data was sent successfully",
          content: fetchedPosts,
          maxPosts: count
        })
      }
    )
    .catch(
      (err) => {
        response.status(400).send({
          error: err
        })
      }
    )
}

updateCommentStatus = (request, response) => {

  let body = _.pick(request.body, ['commentStatus', 'postID', 'postCreatorID']);

  let updateBody = {
    commentStatus: body.commentStatus
  }

  Post.findOneAndUpdate({
    _id: body.postID,
    creator_id: body.postCreatorID
  }, {
    $set: updateBody
  }, {
    new: true
  }).then(
    (result) => {
      response.status(200).send({
        status: "The data has been successfully saved.",
        post: result
      });
    }
  ).catch(
    (error) => {
      response.status(400).send({
        error: error
      })
    }
  )
}

getPostsByUserId = (request, response) => {

  let id = request.user._id;

  Post.find({
      creator_id: id
    }).then(
      (posts) => {
        response.status(200).send({
          status: "Posts have been fetched successfully",
          posts: posts
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

module.exports = {
  updatePost,
  deletePost,
  getPostById,
  savePost,
  getPosts,
  updateCommentStatus,
  getPostsByUserId
}
