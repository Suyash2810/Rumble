const {
  PostData
} = require('../../models/post_data');

const {
  ObjectID
} = require('mongodb');

let id1 = new ObjectID().toHexString();
let id2 = new ObjectID().toHexString();

let viewFavs = [{
    _id: new ObjectID().toHexString(),
    parent_post_id: id1
  },
  {
    _id: new ObjectID().toHexString(),
    parent_post_id: id2,
    favorites: 1
  }
];

let populateViewFavs = (done) => {

  PostData.remove({})
    .then(
      () => {
        PostData.insertMany(viewFavs).then(() => done())
      }
    );
}

module.exports = {
  id1,
  id2,
  viewFavs,
  populateViewFavs
}
