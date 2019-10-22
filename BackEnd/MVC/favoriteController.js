const {
  Favorite
} = require('../models/favorite');

const _ = require('lodash');

var addfavorite = (request, response) => {

  let data = _.pick(request.body, ['username', 'title', 'description', 'postId', 'userId']);

  let favorite = new Favorite(data);

  favorite.save().then(
    (result) => {
      response.status(200).send({
        status: "The data has been saved succesfully",
        favorite: result
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

var getFavorites = (request, response) => {

  let id = request.user._id;

  Favorite.find({
    userId: id
  }).then(
    (result) => {
      response.status(200).send({
        status: "The data has been fetched successfully",
        favorites: result
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

var removefavorite = (request, response) => {

  let postId = request.params.postId;

  Favorite.findOneAndDelete({
    postId: postId
  }).then(
    (result) => {
      response.status(200).send({
        status: "The data has been deleted.",
        favorite: result
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

var getFavoriteById = (request, response) => {

  let postId = request.params.postId;
  let userId = request.params.userId;

  Favorite.findOne({
    postId: postId,
    userId: userId
  }).then(
    (result) => {
      response.status(200).send({
        status: "The data was found successfully.",
        favorite: result
      })
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
  addfavorite,
  getFavorites,
  removefavorite,
  getFavoriteById
}
