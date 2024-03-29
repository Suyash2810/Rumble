const {
  PostData
} = require('../models/post_data');

const _ = require('lodash');

getPostData = (request, response) => {

  PostData.find({})
    .then(
      (result) => {

        response.status(200).send({
          status: "The data has been fetched.",
          data: result
        });
      }
    )
    .catch(
      (error) => {
        response.status(400).send({
          error: error
        })
      }
    )
}

updatePostData = async (request, response) => {

  let post_id = _.pick(request.body, ['post_id']);

  let
    views = await PostData.find({
      parent_post_id: post_id.post_id
    });

  if (views.length === 0) {
    response.status(400).send({
      err: "Data could not be retrieved."
    });
  }

  views = views[0].views;

  PostData.findOneAndUpdate({
      parent_post_id: post_id.post_id
    }, {
      $set: {
        views: views + 1
      }
    }, {
      new: true
    })
    .then(
      (result) => {

        response.status(200).send({
          status: "The views were updated.",
          data: result
        })
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

savePostData = (request, response) => {

  let post_id = _.pick(request.body, ['post_id']);

  let viewFavdata = new PostData({
    parent_post_id: post_id.post_id
  });

  viewFavdata.save()
    .then(
      (result) => {
        response.status(200).send({
          status: "The data has been saved.",
          data: result
        })
      }
    )
    .catch(
      (error) => {
        response.status(400).send({
          error: error
        })
      }
    );
}

let updateFavoriteData = async (request, response) => {

  let {
    post_id,
    change
  } = _.pick(request.body, ['post_id', 'change']);

  let data = await PostData.find({
    parent_post_id: post_id
  });

  if (change < -1) {
    response.status(400).send({
      err: "Invalid data sent."
    });
  }

  if (change > 1) {
    response.status(400).send({
      err: "Invalid data sent."
    });
  }

  if (data.length === 0) {
    response.status(400).send({
      err: "Invalid data sent."
    });
  }

  PostData.findOneAndUpdate({
      parent_post_id: post_id
    }, {
      $set: {
        favorites: data[0].favorites + change
      }
    }, {
      new: true
    })
    .then(
      (result) => {

        response.status(200).send({
          status: "The favorites were updated.",
          data: result
        })
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

let deleteViewFavData = (request, response) => {

  let post_id = request.params.post_id;
  console.log(post_id);

  PostData.findOneAndDelete({
      parent_post_id: post_id
    })
    .then(
      (result) => {
        if (result != null) {
          response.status(200).send({
            status: "The data has been deleted."
          });
        } else {
          response.status(400).send({
            err: "The data could not be deleted."
          });
        }

      }
    )
    .catch(
      (err) => {

        response.status(400).send({
          error: err
        });
      }
    );
}

module.exports = {
  savePostData,
  getPostData,
  updatePostData,
  updateFavoriteData,
  deleteViewFavData
}
