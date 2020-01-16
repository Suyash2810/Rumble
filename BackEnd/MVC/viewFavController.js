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

  let {
    views
  } = await PostData.find({
    parent_post_id: post_id
  });

  PostData.findOneAndUpdate({
      parent_post_id: post_id
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
    parent_post_id: post_id
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